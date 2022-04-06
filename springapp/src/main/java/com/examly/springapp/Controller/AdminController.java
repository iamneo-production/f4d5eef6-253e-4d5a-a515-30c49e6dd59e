package com.examly.springapp.Controller;

import java.security.Principal;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.examly.springapp.Repositories.AdminRepository;
import com.examly.springapp.Repositories.BikeRepository;
import com.examly.springapp.SecurityConfiguration.LoginRepository;
import com.examly.springapp.Repositories.UserBookingsRepository;
import com.examly.springapp.SecurityConfiguration.LoginModel;
import com.examly.springapp.SecurityConfiguration.Roles;
import com.examly.springapp.Models.AdminModel;
import com.examly.springapp.Models.BikeModel;
import com.examly.springapp.Models.UserBookingsModel;

import lombok.AllArgsConstructor;

@RestController
@AllArgsConstructor
@RequestMapping("/admin")
@PreAuthorize("hasRole('ADMIN')")
public class AdminController {
	
	private final BikeRepository bikeRepo;
	private final AdminRepository adminRepo;
	private final LoginRepository loginRepo;
	private final UserBookingsRepository bookingsRepo;

	//admin dashboard
	@GetMapping("/")
	public List<BikeModel> adminHome(Principal loggedInUser) {
		// System.out.println(loginRepo.findAll().stream().filter(m -> loggedInUser.getName().hashCode()==m.getEmail().hashCode()).findFirst().get());
		// String k=loggedInUser.getName();
		
		Optional<AdminModel> adminModel = adminRepo.findAll().stream()
						   .filter(admin -> loggedInUser.getName().equals(admin.getEmail()))
						   .findFirst();
		
		if(adminModel.isPresent())
		{
			String adminID = adminModel.get().getId()+"";
			
            List<BikeModel> bmList = new ArrayList<>();

            for(BikeModel bm : bikeRepo.findAll()){
                if(bm.getAdminID().equals(adminID))
                bmList.add(bm);
            }

            return bmList;

			// return bikeRepo.findAll().stream()
			// 				.filter(bike -> bike.getAdminID().equals(adminID))
			// 				.toList();
			
		}
		else {
			return null;
		}
		

	}
	
	
//Bike CRUD operations started	
	@RequestMapping(method=RequestMethod.POST,value="/addBike")
	public String addBike(Principal loggedInUser,@RequestBody BikeModel bikeModel) {
		if(bikeModel.getBikeModelName().isEmpty()|bikeModel.getBikeNo().isEmpty()||
				bikeModel.getPrice().isEmpty()||bikeModel.getType().isEmpty()) {
			return "Fields cannot be empty";
		}
		//retrieves the seller name or admin email(i.e., username) from database
//		System.out.println(loggedInUser);
		String adminUsername = loggedInUser.getName();
		//retrieves the model of admin for email
		AdminModel adminModel = adminRepo.findAll().stream()
									.filter(admin -> adminUsername.hashCode()==admin.getEmail().hashCode())
									.findFirst().get();
		boolean check = checkBikeExistence(bikeModel);
		//sets the admin ID in bikeModel
		bikeModel.setAdminID(adminModel.getId()+"");
		bikeModel.setStatus("Available");		
		bikeModel.setCompanyName(adminModel.getCompanyName());
		if(!check) {
		bikeRepo.save(bikeModel); 
		System.out.println(bikeModel);
		return "Bike Added Successfully";
		}
		else
			return "Bike already exists";
	}
	
	@RequestMapping(method=RequestMethod.PUT,value="/editBike/{bikeID}")
	public String editBike(Principal loggedInUser,@PathVariable Long bikeID,@RequestBody BikeModel bikeModel) {
		
		Optional<BikeModel> checkBike = bikeRepo.findAll().stream()
												.filter(bike -> (bikeModel.getBikeNo().hashCode() == bike.getBikeNo().hashCode())&&(bikeID!=bike.getBikeID())).findFirst();
		
		if(!checkBike.isPresent()) {
		//retrieves the seller name or admin email(i.e., username) from database
		String adminUsername = loggedInUser.getName();
		
		//retrieves the model of admin for email
		AdminModel adminModel = adminRepo.findAll().stream()
							.filter(admin -> adminUsername.hashCode()==admin.getEmail().hashCode())
							.findFirst().get();
		
		//sets the admin ID in bikeModel
		bikeModel.setBikeID(bikeID);
		bikeModel.setAdminID(adminModel.getId()+"");
		
		Optional<BikeModel> bike = bikeRepo.findById(bikeID);
		
		if(bike.isPresent())
		{
			if(bikeModel.getStatus().toLowerCase().hashCode()=="available".hashCode())
			{
				Optional<UserBookingsModel> userBookingsID = bookingsRepo.findAll().stream()
									.filter(book -> bikeID == book.getBikeID()).findFirst();
				if(userBookingsID.isPresent())						
				bookingsRepo.deleteById(userBookingsID.get().getId());
			}

			bikeRepo.saveAndFlush(bikeModel);
		}
		else
			return "Bike with id not found";
		}
		else
			return "Bike number already present";
		return "bike edited succesfully";
	}
	
	@RequestMapping(method=RequestMethod.DELETE,value="/deleteBike/{bikeID}")
	public String deleteBike(@PathVariable Long bikeID) {
		
		Optional<BikeModel> bike = bikeRepo.findById(bikeID);
		
		if(bike.isPresent())
		{
			Optional<UserBookingsModel> userBookingsID = bookingsRepo.findAll().stream()
									.filter(book -> bikeID == book.getBikeID()).findFirst();
			if(userBookingsID.isPresent())						
				bookingsRepo.deleteById(userBookingsID.get().getId());

			bikeRepo.deleteById(bikeID);
		}
		else
			return "Bike not found";
		
		return "Bike deleted Succesfully";
	}
	
//	Bike CRUD operations completed
	
	
	//ADMIN PROFILE CRUD OPERATION STARTED
	
	@GetMapping("/profile")
	public AdminModel adminProfile(Principal loggedInUser) {
		return adminRepo.findAll().stream()
					.filter(admin -> admin.getEmail().hashCode()==loggedInUser.getName().hashCode())
					.findFirst().get();
		
		
	}
	
	@PutMapping("/profile/{adminID}")
	public String editAdminProfile(Principal loggedInUser,@PathVariable Long adminID,
								@RequestBody AdminModel adminModel) {
		Optional<AdminModel> checkExistence = adminRepo.findById(adminID);
		
		boolean checkAuthorization = checkExistence.get().getEmail().hashCode()==loggedInUser.getName().hashCode();
		
		if(checkAuthorization&&checkExistence.isPresent())
		{
			adminRepo.save(adminModel);
			return "profile edited successfully";
		}
		else
			throw new UsernameNotFoundException(String.format("Illegal Access by %s", loggedInUser.getName()));
		
		
	}
	
	//ADMIN CRUD OPERATIONS COMPLETED
	
	//checking whether bike already exists or not
	public boolean checkBikeExistence(BikeModel bikeModel)
	{
		Optional<BikeModel> check = bikeRepo.findAll().stream()
				.filter(bike -> bikeModel.getBikeNo().hashCode()==bike.getBikeNo().hashCode())
				.findFirst();
		if(check.isPresent())
			return true;
		else
			return false;
	}
	
}

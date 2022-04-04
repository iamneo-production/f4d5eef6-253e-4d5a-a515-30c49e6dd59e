package com.examly.springapp.Controller;

import java.security.Principal;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.examly.springapp.Repositories.AdminRepository;
import com.examly.springapp.Repositories.BikeRepository;
import com.examly.springapp.Repositories.UserBookingsRepository;
import com.examly.springapp.Repositories.UserRepository;
import com.examly.springapp.SecurityConfiguration.LoginModel;
import com.examly.springapp.SecurityConfiguration.LoginRepository;
import com.examly.springapp.SecurityConfiguration.Roles;
import com.examly.springapp.Models.BikeModel;
import com.examly.springapp.Models.UserBookingsModel;
import com.examly.springapp.Models.UserModel;
import com.examly.springapp.Models.AdminModel;


import lombok.AllArgsConstructor;



@RestController
@AllArgsConstructor
@RequestMapping("/user")
@PreAuthorize("hasRole('ROLE_USER')")
public class UserController {
	
	
	private final UserBookingsRepository bookingsRepo;
	private final BikeRepository bikeRepo;
	private final UserRepository userRepo;
	private final LoginRepository loginRepo;
	private final AdminRepository adminRepo;
	
	@GetMapping
	public String userHome() {
		
		return "Welcome User";
	}
	
	/*@GetMapping("/dashboard")
	public List<BikeModel> dashboard(){

        List<BikeModel> bmList = new ArrayList<>();

        for(BikeModel bm : bikeRepo.findAll()){
            if(bm.getStatus().toLowerCase().hashCode()=="available".hashCode())
            bmList.add(bm);
        }
        return bmList;
		// return bikeRepo.findAll().stream()
		// 			.filter(bike -> bike.getStatus().toLowerCase().hashCode()=="available".hashCode())
		// 			.toList();
	}*/
	
	@GetMapping("/dashboard")
	public List<AdminModel> dashboard(){

        List<AdminModel> adminList = new ArrayList<>();

        for(AdminModel am : adminRepo.findAll()){
            
            adminList.add(am);
        }

		return adminList;
	}


	@GetMapping("/bikes/{adminID}")
	public List<BikeModel> companyBikes(@PathVariable("adminID") String id){
		Long adminID = Long.parseLong(id);
		if(adminRepo.findById(adminID).isPresent()){
            List<BikeModel> bmList = new ArrayList<>();
            for(BikeModel bm : bikeRepo.findAll()){
                if(bm.getAdminID().equals(adminID+""))
                bmList.add(bm);
            }
            return bmList;
        }
		// return bikeRepo.findAll().stream()
		// 			.filter(bike -> bike.getAdminID().equals(adminID+"")).toList();
		else
			return new ArrayList<>();
	}
	
	@GetMapping("/bikeDetails/{bikeID}")
	public BikeModel getDetails(@PathVariable Long bikeID) throws Exception{
		Optional<BikeModel> checkBikeExistence = bikeRepo.findById(bikeID);
		
		if(checkBikeExistence.isPresent())
		return checkBikeExistence.get();
		else
			throw new IllegalStateException(String.format("%s not found", bikeID.toString()));
	}
	
	
	@PostMapping("/bookBike/{bikeID}")
	public String bookBike(@PathVariable Long bikeID,Principal loggedInUser) {
		Optional<BikeModel> bikeModel = bikeRepo.findById(bikeID);
		if(bikeModel.isPresent()) {
			if(!bikeModel.get().getStatus().equals("Booked"))
			{
				bikeModel.get().setStatus("Booked");
				bikeRepo.save(bikeModel.get());
				bookingsRepo.save(new UserBookingsModel(loggedInUser.getName(),bikeID,
									bikeModel.get().getCompanyName(),bikeModel.get().getPrice(),bikeModel.get().getBikeModelName()));
				return "Bike booked succesfully";
			}
			else
				return "Bike Already Booked";
		}
		
		return "No Bike found with this ID";
		
	}
	
	@PostMapping("/unBookBike/{bikeID}")
	public String unBookBike(@PathVariable Long bikeID, Principal loggedInUser) {
		Optional<BikeModel> bikeModel = bikeRepo.findById(bikeID);
		
		if(bikeModel.isPresent()) {
			Optional<UserBookingsModel> model=bookingsRepo.findAll().stream()
					.filter(b -> b.getBikeID()==bikeID).findFirst();
			if(model.isPresent())
			{				
				bookingsRepo.deleteById(model.get().getId());
				bikeModel.get().setStatus("Available");
				bikeRepo.save(bikeModel.get());
				System.out.println(bikeID+" "+bikeRepo.findById(bikeID).get());
				return "unbooked successfully";
			}
			else
				return "bike not present in user bookings";
		}
		else
			return "some error occured";
	}
	
	
	@GetMapping("/bookings")
	public List<UserBookingsModel> userBookings(Principal loggedInUser){
		
		String userEmail = loggedInUser.getName();
		
		//retrieve all the bikeID's from bookingsRepo for the currently loggedIn User
		List<UserBookingsModel> bikeBookings = new ArrayList<>();

		for(UserBookingsModel ubm : bookingsRepo.findAll()){
			if(ubm.getUserEmail().equals(userEmail))
			bikeBookings.add(ubm);
		}
						        // bookingsRepo.findAll().stream()
						        // 	.filter(booking -> booking.getUserEmail().equals(userEmail))
						        // 	.toList();
		
			
		return bikeBookings;	
	}
	
	//User profile show
	@GetMapping("/profile")
	public UserModel getUserProfile(Principal loggedInUser) {
		return userRepo.findByEmail(loggedInUser.getName()).get();
	}
	
	@PutMapping("/editProfile")
	public String editUserProfile(Principal loggedInUser,@RequestBody UserModel responseUser)
	{
		Optional<UserModel> responseUserOpt=userRepo.findAll().stream()
		.filter(user -> user.getEmail().hashCode()==responseUser.getEmail().hashCode())
		.findFirst(); 

		Optional<UserModel> userOpt=userRepo.findAll().stream()
		.filter(user->user.getEmail().hashCode()==loggedInUser.getName().hashCode())
		.findFirst();
		// System.out.println("responseUserOpt :"+responseUserOpt.get());
		// System.out.println("userOpt :"+userOpt.get());
		if(responseUserOpt.isPresent()&&userOpt.isPresent())
		{
			if(responseUserOpt.get().getId()!=userOpt.get().getId()) {
			if(responseUserOpt.get().getEmail().hashCode()==responseUser.getEmail().hashCode())
				return "email already exists";
			}
			else {
			System.out.println("Entered here");
			LoginModel loginModel = loginRepo.findAll().stream()
					.filter(login -> login.getUsername().hashCode()==userOpt.get().getEmail().hashCode())
					.findFirst().get();
			
			loginModel.setEmail(responseUser.getEmail());
			loginRepo.save(loginModel);
	
			responseUser.setPassword(userOpt.get().getPassword());
			responseUser.setUserRole(Roles.USER.name());
			responseUser.setId(userOpt.get().getId());
	
			userRepo.save(responseUser);
			return "User profile updated succesfully";
		}
		}
		else {
			System.out.println("Entered here");
			Optional<LoginModel> loginModel = loginRepo.findAll().stream()
					.filter(login -> login.getUsername().hashCode()==userOpt.get().getEmail().hashCode())
					.findFirst();
			if(loginModel.isPresent()){
			loginModel.get().setEmail(responseUser.getEmail());
			loginRepo.save(loginModel.get());

			responseUser.setPassword(userOpt.get().getPassword());
			responseUser.setUserRole(Roles.USER.name());
			responseUser.setId(userOpt.get().getId());

			userRepo.save(responseUser);
			return "User profile updated succesfully";
			}
			else{
				return "unauthorized access";
			}
	}

	return "Some error occured";
		
	}
}

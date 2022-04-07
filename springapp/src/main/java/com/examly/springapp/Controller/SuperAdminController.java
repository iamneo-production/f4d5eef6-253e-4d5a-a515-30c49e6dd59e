package com.examly.springapp.Controller;

import java.util.List;
import java.util.ArrayList;
import java.util.Optional;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.examly.springapp.Repositories.AdminRepository;
import com.examly.springapp.Repositories.UserRepository;
import com.examly.springapp.Repositories.BikeRepository;
import com.examly.springapp.SecurityConfiguration.LoginModel;
import com.examly.springapp.SecurityConfiguration.LoginRepository;
import com.examly.springapp.Models.AdminModel;
import com.examly.springapp.Models.UserModel;
import com.examly.springapp.Models.BikeModel;

import lombok.AllArgsConstructor;

@RestController
@AllArgsConstructor
@RequestMapping("/superAdmin")
@PreAuthorize("hasRole('ROLE_SUPERADMIN')")
public class SuperAdminController {
	private final UserRepository userRepo;
	private final AdminRepository adminRepo;
	private final LoginRepository loginRepo;
	private final BikeRepository bikeRepo;

	@GetMapping("/getAdmins")
	public List<AdminModel> getAllAdmins(){
		return adminRepo.findAll();
	}
	
	@GetMapping("/getUsers")
	public List<UserModel> getAllUsers(){
		return userRepo.findAll();
	}
	
	@GetMapping("/getLoginCredentials")
	public List<LoginModel> getAllloginCredentials(){
		return loginRepo.findAll();
	}
	
	@GetMapping("/getBookings")
	public List<BikeModel> getAllBookings(){
		List<BikeModel> bmList = new ArrayList<>();
		for(BikeModel bm : bikeRepo.findAll())
			bmList.add(bm);
		return bmList;
	}
	
	@DeleteMapping("/deleteAdmin/{adminID}")
	public String deleteAdmin(@PathVariable Long adminID) {
		Optional<AdminModel> checkAdminExistence = adminRepo.findById(adminID);
		
		if(checkAdminExistence.isPresent())
		{
			Long id= loginRepo.findAll().stream().filter(login -> checkAdminExistence.get().getEmail().hashCode()==login.getUsername().hashCode()).findFirst().get().getId();
			loginRepo.deleteById(id);
			System.out.println(loginRepo.findById(id));
			adminRepo.deleteById(adminID);
			return "Admin Deleted Successfully";
		}
		else
			return "AdminID not present";
	}
	
	@DeleteMapping("/deleteUser/{userID}")
	public String deleteUser(@PathVariable Long userID) {
		Optional<UserModel> checkUserExistence = userRepo.findById(userID);
		
		if(checkUserExistence.isPresent())
		{
			Long id= loginRepo.findAll().stream().filter(login -> checkUserExistence.get().getEmail().hashCode()==login.getUsername().hashCode()).findFirst().get().getId();
			loginRepo.deleteById(id);
			userRepo.deleteById(userID);
			return "User Deleted Successfully";
		}
		else
			return "UserID not present";
	}
}

package com.examly.springapp.Controller;

import java.util.Optional;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.examly.springapp.SecurityConfiguration.ApplicationService;
import com.examly.springapp.SecurityConfiguration.LoginRepository;
import com.examly.springapp.SecurityConfiguration.Roles;
import com.examly.springapp.Models.AdminModel;
import com.examly.springapp.Models.SuperAdmin;
import com.examly.springapp.Models.UserModel;

import lombok.AllArgsConstructor;
import com.examly.springapp.SecurityConfiguration.LoginModel;


@RestController
@AllArgsConstructor
public class AuthController {
	
	private final ApplicationService appService;
    private final LoginRepository loginRepo;
	
	@RequestMapping("/success")
	public String success() {
		
		return "Succesfully Logged In";
	}
	
	@RequestMapping(method=RequestMethod.POST,value="/authSuperAdmin/signup")
	public void superAdminSignUp(@RequestBody SuperAdmin superAdminModel) {
			
		superAdminModel.setRole("SUPERADMIN");
		appService.registerSuperAdmin(superAdminModel);
	
		
	}
	
	@RequestMapping(method=RequestMethod.POST,value="/authAdmin/signup")
	public String adminSignUp(@RequestBody AdminModel adminModel) {
		
		String check=checkAdminModelEntries(adminModel);
		
		if(!checkAdminExistence(adminModel)&&check.equals("All Credentials are correct")) {
			
			
		adminModel.setUserRole(Roles.ADMIN.name());
		appService.registerAdmin(adminModel);
		return "Admin Succesfully registered";
		}
		else if(!check.equals("All Credentials are correct"))
			return check;
		else
			return "Admin already exists ";
	}
	
	@RequestMapping(method=RequestMethod.POST,value="/authUser/signup")
	public String UserSignUp(@RequestBody UserModel userModel) {
		String check=checkUserModelEntries(userModel);
		System.out.println(check);
		if(!checkUserExistence(userModel)&&check.equals("All Credentials are correct"))
		{
			userModel.setUserRole(Roles.USER.name());
			appService.registerUser(userModel);
			return "User Succesfully registered";
		}
		else if(!check.equals("All Credentials are correct"))
			return check;
		else
			return "User Already Exists";
	}
	
	//check admin or user already exists or not
	public boolean checkAdminExistence(AdminModel adminModel) {
		
		Optional<LoginModel> check = loginRepo.findAll().stream()
			.filter(login -> adminModel.getEmail().hashCode()==login.getEmail().hashCode())
			.findFirst();
		
		if(check.isPresent())
			return true;
		else
			return false;
		
	}
	
	public boolean checkUserExistence(UserModel userModel) {
		Optional<LoginModel> check = loginRepo.findAll().stream()
				.filter(login -> userModel.getEmail().hashCode()==login.getEmail().hashCode())
				.findFirst();
			
			if(check.isPresent())
				return true;
			else
				return false;
	}
	
	public String checkAdminModelEntries(AdminModel adminModel) {
		
		if(adminModel.getCompanyAddress()==null||adminModel.getCompanyAddress().length()<3)
			return "company address cannot be null or length cannot be less than  3";
		if(adminModel.getCompanyImageURL()==null||adminModel.getCompanyAddress().length()<3)
			return "company image url cannot be null or length cannot be less than  3";
		if(adminModel.getEarnings()<=0)
			return "Earnings cannot be zero or less";
		if(adminModel.getEmail()==null||adminModel.getEmail().length()<3)
			return "email cannot be null or length cannot be less than  3";
		if(adminModel.getMobileNumber()==null||adminModel.getMobileNumber().length()!=10)
			return "Invalid mobile number";
		if(adminModel.getPassword()==null||adminModel.getPassword().length()<8)
			return "password cannot be null or length cannot be less than 8";
		if(adminModel.getSellerName()==null||adminModel.getSellerName().length()<3)
			return "sellername cannot be null or length cannot be less than  3";		
		//regex Pattern for email
		String regexPattern = "^(?=.{1,64}@)[A-Za-z0-9_-]+(\\.[A-Za-z0-9_-]+)*@" 
		        + "[^-][A-Za-z0-9-]+(\\.[A-Za-z0-9-]+)*(\\.[A-Za-z]{2,})$";
		
		if(!Validator(regexPattern,adminModel.getEmail()))
			return "invalid email id";
		
		//regex Pattern for mobile
		regexPattern = "[6-9][0-9]{9}";
		
		if(!Validator(regexPattern,adminModel.getMobileNumber()))
			return "invalid mobile number";
		
		//regex pattern for password
		regexPattern = "^(?=.*[0-9])"+"(?=.*[a-z])(?=.*[A-Z])"+"(?=.*[@#$%^&+=])"+"(?=\\S+$).{8,20}$";

		if(!Validator(regexPattern,adminModel.getPassword()))
			return "invalid password";
		
		return "All Credentials are correct";
	}
	
	
    public String checkUserModelEntries(UserModel userModel) {
		
		if(userModel.getEmail()==null||userModel.getEmail().length()<3)
			return "email cannot be null or length cannot be less than  3";
		if(userModel.getMobileNumber()==null||userModel.getMobileNumber().length()!=10)
			return "Invalid mobile number";
		if(userModel.getPassword()==null||userModel.getPassword().length()<3)
			return "password cannot be null or length cannot be less than  3";
		if(userModel.getUsername()==null||userModel.getUsername().length()<3)
			return "username cannot be null or length cannot be less than  3";
		if(userModel.getAge()<=15)
			return "age cannot be less than 15";
		
		
		//regex Pattern for email
		String regexPattern = "^(?=.{1,64}@)[A-Za-z0-9_-]+(\\.[A-Za-z0-9_-]+)*@" 
		        + "[^-][A-Za-z0-9-]+(\\.[A-Za-z0-9-]+)*(\\.[A-Za-z]{2,})$";
		
		if(!Validator(regexPattern,userModel.getEmail()))
			return "invalid mobile number";
		
		//regex Pattern for mobile
		regexPattern = "[6-9][0-9]{9}";
		
		if(!Validator(regexPattern,userModel.getMobileNumber()))
			return "invalid mobile number";
		
		//regex pattern for password
		regexPattern = "^(?=.*[0-9])"+"(?=.*[a-z])(?=.*[A-Z])"+"(?=.*[@#$%^&+=])"+"(?=\\S+$).{8,20}$";

		if(!Validator(regexPattern,userModel.getPassword()))
			return "invalid password";
		
		return "All Credentials are correct";
	}

	
	
	public boolean Validator(String regexPattern,String string) {
	    Pattern pattern = Pattern.compile(regexPattern);
	    Matcher matcher = pattern.matcher(string);
	    
	    if(matcher.find())
	    	return true;
	    else
	    	return false;
	}
}

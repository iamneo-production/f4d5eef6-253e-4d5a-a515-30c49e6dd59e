package com.examly.springapp.SecurityConfiguration;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.examly.springapp.Repositories.AdminRepository;
import com.examly.springapp.Repositories.SuperAdminRepository;
import com.examly.springapp.Repositories.UserRepository;
import com.examly.springapp.Models.AdminModel;
import com.examly.springapp.Models.SuperAdmin;
import com.examly.springapp.Models.UserModel;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class ApplicationService implements UserDetailsService{
	
	private final LoginRepository repo;
	private final UserRepository userRepo;
	private final AdminRepository adminRepo;
	private final SuperAdminRepository superAdminRepo;
	private final PasswordEncoder passwordEncoder;
	
	@Override
	public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
	
		return repo.findByEmail(email)
				.orElseThrow(() -> new UsernameNotFoundException(String.format("%s not found", email)))
				;
	}
	
	public String registerUser(UserModel user) {
		user.setPassword(passwordEncoder.encode(user.getPassword()));		
		userRepo.save(user);
		repo.save(new LoginModel(user.getEmail(),user.getPassword(),"ROLE_"+user.getUserRole()));
		
		return "User Registered Successfully";
	}

	public String registerAdmin(AdminModel admin) {
		admin.setPassword(passwordEncoder.encode(admin.getPassword()));		
		adminRepo.save(admin);
		repo.save(new LoginModel(admin.getEmail(),admin.getPassword(),"ROLE_"+admin.getUserRole()));
		
		return "Admin Registered Successfully";
		
	}
	
	public String registerSuperAdmin(SuperAdmin superAdmin) {
		superAdmin.setSuperAdminPassword(passwordEncoder.encode(superAdmin.getSuperAdminPassword()));
		superAdminRepo.save(superAdmin);
		repo.save(new LoginModel(superAdmin.getSuperAdminEmail(),superAdmin.getSuperAdminPassword(),"ROLE_"+superAdmin.getRole()));
		return "Super Admin Resgietered Succesfully";
	}
}

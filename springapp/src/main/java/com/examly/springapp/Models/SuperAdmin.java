package com.examly.springapp.Models;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Table(name="super_admin")
public class SuperAdmin {
	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private Long id;
	private String superAdminEmail;
	private String superAdminPassword;
	private String role;
	//superAdminEmail = super@gmail.com
	//superAdminPassword = 1234
    
    
    @Override
    public String toString() {
        return "SuperAdmin [id=" + id + ", role=" + role + ", superAdminEmail=" + superAdminEmail
                + ", superAdminPassword=" + superAdminPassword + "]";
    }
    public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
    }
    public String getSuperAdminEmail() {
        return superAdminEmail;
    }
    public void setSuperAdminEmail(String superAdminEmail) {
        this.superAdminEmail = superAdminEmail;
    }
    public String getSuperAdminPassword() {
        return superAdminPassword;
    }
    public void setSuperAdminPassword(String superAdminPassword) {
        this.superAdminPassword = superAdminPassword;
    }
    public String getRole() {
        return role;
    }
    public void setRole(String role) {
        this.role = role;
    }
	
}

package com.examly.springapp.Models;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import org.hibernate.annotations.ValueGenerationType;

import com.examly.springapp.SecurityConfiguration.Roles;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name="adminmodel")
public class AdminModel {
	
	@Id
	@GeneratedValue(strategy=GenerationType.SEQUENCE)
	private Long id;
	private String email;
	private String password;
	private String mobileNumber;
	private String sellerName;
	private String userRole;
	private String companyName;
	private String companyImageURL;
	private String companyAddress;
	private int earnings;
    public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
    }
    public String getEmail() {
        return email;
    }
    public void setEmail(String email) {
        this.email = email;
    }
    public String getPassword() {
        return password;
    }
    public void setPassword(String password) {
        this.password = password;
    }
    public String getMobileNumber() {
        return mobileNumber;
    }
    public void setMobileNumber(String mobileNumber) {
        this.mobileNumber = mobileNumber;
    }
    public String getSellerName() {
        return sellerName;
    }
    public void setSellerName(String sellerName) {
        this.sellerName = sellerName;
    }
    public String getUserRole() {
        return userRole;
    }
    public void setUserRole(String userRole) {
        this.userRole = userRole;
    }
    public String getCompanyName() {
        return companyName;
    }
    public void setCompanyName(String companyName) {
        this.companyName = companyName;
    }
    public String getCompanyImageURL() {
        return companyImageURL;
    }
    public void setCompanyImageURL(String companyImageURL) {
        this.companyImageURL = companyImageURL;
    }
    public String getCompanyAddress() {
        return companyAddress;
    }
    public void setCompanyAddress(String companyAddress) {
        this.companyAddress = companyAddress;
    }
    public int getEarnings() {
        return earnings;
    }
    public void setEarnings(int earnings) {
        this.earnings = earnings;
    }
    @Override
    public String toString() {
        return "AdminModel [companyAddress=" + companyAddress + ", companyImageURL=" + companyImageURL
                + ", companyName=" + companyName + ", earnings=" + earnings + ", email=" + email + ", id=" + id
                + ", mobileNumber=" + mobileNumber + ", password=" + password + ", sellerName=" + sellerName
                + ", userRole=" + userRole + "]";
    }
}

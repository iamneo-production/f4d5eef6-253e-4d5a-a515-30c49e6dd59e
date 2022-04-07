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
import lombok.ToString;


@NoArgsConstructor
@Entity
@Table(name="user_bookings_model")
public class UserBookingsModel {
	
	@Id
	@GeneratedValue(strategy=GenerationType.SEQUENCE)
	private Long id;
	private String userEmail;
    private Long userID;
	private Long bikeID;
	private String companyName;
	private String bikePrice;
    private String bikeModelName;
	
	public UserBookingsModel(Long userID,String userEmail,Long bikeID,String companyName,String bikePrice,String bikeModelName) {
		this.userID=userID;
        this.userEmail=userEmail;
		this.bikeID=bikeID;
		this.companyName=companyName;
		this.bikePrice=bikePrice;
        this.bikeModelName=bikeModelName;
	}

  
 


    public Long getUserID() {
        return userID;
    }





    public void setUserID(Long userID) {
        this.userID = userID;
    }





    public String getBikeModelName() {
        return bikeModelName;
    }





    public void setBikeModelName(String bikeModelName) {
        this.bikeModelName = bikeModelName;
    }





    @Override
    public String toString() {
        return "UserBookingsModel [bikeID=" + bikeID + ", bikePrice=" + bikePrice + ", bikeModelName=" + bikeModelName
                + ", companyName=" + companyName + ", id=" + id + ", userEmail=" + userEmail + "]";
    }





    public String bikeModelName() {
        return bikeModelName;
    }





    public void bikeModelName(String bikeModelName) {
        this.bikeModelName = bikeModelName;
    }





    public String getCompanyName() {
        return companyName;
    }


    public void setCompanyName(String companyName) {
        this.companyName = companyName;
    }


    public String getBikePrice() {
        return bikePrice;
    }


    public void setBikePrice(String bikePrice) {
        this.bikePrice = bikePrice;
    }


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUserEmail() {
        return userEmail;
    }

    public void setUserEmail(String userEmail) {
        this.userEmail = userEmail;
    }

    public Long getBikeID() {
        return bikeID;
    }

    public void setBikeID(Long bikeID) {
        this.bikeID = bikeID;
    }
}

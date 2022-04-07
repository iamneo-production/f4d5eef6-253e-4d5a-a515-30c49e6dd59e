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

@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name="bikemodel")
public class BikeModel {
	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private Long bikeID;
	private String bikeNo;
	private String adminID;
    private String companyName;
    private String bikeModelName;
	private String status;
	private String price;
	private String type;

    
    public String getBikeModelName() {
        return bikeModelName;
    }
    public void setBikeModelName(String bikeModelName) {
        this.bikeModelName = bikeModelName;
    }
    public String getCompanyName() {
        return companyName;
    }
    public void setCompanyName(String companyName) {
        this.companyName = companyName;
    }
    public Long getBikeID() {
        return bikeID;
    }
    public void setBikeID(Long bikeID) {
        this.bikeID = bikeID;
    }
    public String getBikeNo() {
        return bikeNo;
    }
    public void setBikeNo(String bikeNo) {
        this.bikeNo = bikeNo;
    }
    public String getAdminID() {
        return adminID;
    }
    public void setAdminID(String adminID) {
        this.adminID = adminID;
    }
    public String getStatus() {
        return status;
    }
    public void setStatus(String status) {
        this.status = status;
    }
    public String getPrice() {
        return price;
    }
    public void setPrice(String price) {
        this.price = price;
    }
    public String getType() {
        return type;
    }
    public void setType(String type) {
        this.type = type;
    }
    @Override
    public String toString() {
        return "BikeModel [adminID=" + adminID + ", bikeID=" + bikeID + ", bikeNo=" + bikeNo + ", price=" + price
                + ", status=" + status + ", type=" + type + "]";
    }
}

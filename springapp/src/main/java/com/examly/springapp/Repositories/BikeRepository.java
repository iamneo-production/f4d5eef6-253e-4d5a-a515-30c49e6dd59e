package com.examly.springapp.Repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.examly.springapp.Models.BikeModel;
import com.examly.springapp.Models.UserModel;

@Repository
public interface BikeRepository extends JpaRepository<BikeModel, Long>{

}

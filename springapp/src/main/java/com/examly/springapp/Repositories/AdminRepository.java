package com.examly.springapp.Repositories;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.examly.springapp.Models.AdminModel;

@Repository
public interface AdminRepository extends JpaRepository<AdminModel,Long>{

}

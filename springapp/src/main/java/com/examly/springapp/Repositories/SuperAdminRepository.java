package com.examly.springapp.Repositories;

import org.springframework.transaction.annotation.Transactional;

import com.examly.springapp.Models.SuperAdmin;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
@Transactional(readOnly=true)
public interface SuperAdminRepository extends JpaRepository<SuperAdmin, Long>{

}

package com.examly.springapp.SecurityConfiguration;

import java.util.Optional;

import org.springframework.transaction.annotation.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
@Transactional(readOnly=true)
public interface LoginRepository extends JpaRepository<LoginModel,Long>{
	Optional<LoginModel> findByEmail(String email);
}

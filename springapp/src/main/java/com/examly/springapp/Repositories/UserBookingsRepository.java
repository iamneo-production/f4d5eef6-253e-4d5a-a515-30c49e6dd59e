package com.examly.springapp.Repositories;
import org.springframework.transaction.annotation.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.examly.springapp.Models.UserBookingsModel;

@Repository
@Transactional(readOnly=true)
public interface UserBookingsRepository extends JpaRepository<UserBookingsModel,Long>{

}

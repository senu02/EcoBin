package com.weekend_45.Ecobin.repository;

import com.weekend_45.Ecobin.entity.OurUsers;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UsersRepo extends JpaRepository<OurUsers,Integer> {
    Optional<OurUsers> findByEmail(String email);
}


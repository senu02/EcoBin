package com.weekend_45.Ecobin.repository;

import com.weekend_45.Ecobin.entity.ContactUs;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ContactRepo extends JpaRepository<ContactUs,Long> {
}

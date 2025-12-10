package com.laras.repository;

import com.laras.entity.Testimonial;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TestimonialRepository extends JpaRepository<Testimonial, Long> {

    List<Testimonial> findByIsVisibleTrueOrderByDisplayOrderAsc();

    List<Testimonial> findAllByOrderByDisplayOrderAsc();
}

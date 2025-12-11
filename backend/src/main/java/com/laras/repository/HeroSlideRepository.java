package com.laras.repository;

import com.laras.entity.HeroSlide;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface HeroSlideRepository extends JpaRepository<HeroSlide, Long> {

    List<HeroSlide> findByIsActiveTrueOrderByDisplayOrderAsc();

    List<HeroSlide> findAllByOrderByDisplayOrderAsc();
}

package com.JGalaxy.JGalaxy.reponsitory;

import com.JGalaxy.JGalaxy.entity.Category;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CategoryRepo extends JpaRepository<Category, Long> {
}

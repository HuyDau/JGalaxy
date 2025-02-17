package com.JGalaxy.JGalaxy.reponsitory;

import com.JGalaxy.JGalaxy.entity.Address;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AddressRepo extends JpaRepository<Address, Long> {
}

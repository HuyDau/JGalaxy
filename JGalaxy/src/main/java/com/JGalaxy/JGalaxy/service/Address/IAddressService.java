package com.JGalaxy.JGalaxy.service.Address;

import com.JGalaxy.JGalaxy.dto.AddressDto;
import com.JGalaxy.JGalaxy.dto.Response;

public interface IAddressService {
    Response saveAndUpdateAddress(AddressDto addressDto);
}

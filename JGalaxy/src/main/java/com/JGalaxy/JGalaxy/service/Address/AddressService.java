package com.JGalaxy.JGalaxy.service.Address;

import com.JGalaxy.JGalaxy.dto.AddressDto;
import com.JGalaxy.JGalaxy.dto.Response;
import com.JGalaxy.JGalaxy.entity.Address;
import com.JGalaxy.JGalaxy.entity.User;
import com.JGalaxy.JGalaxy.reponsitory.AddressRepo;
import com.JGalaxy.JGalaxy.service.User.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AddressService implements IAddressService {

    private final AddressRepo addressRepo;
    private final UserService userService;

    @Override
    public Response saveAndUpdateAddress(AddressDto addressDto) {
        User user = userService.getLoginUser();
        Address address =user.getAddress();
        if (address == null){
            address = new Address();
            address.setUser(user);
        }
        if(addressDto.getStreet() != null) address.setStreet(addressDto.getStreet());
        if(addressDto.getCity() != null) address.setCity(addressDto.getCity());
        if(addressDto.getState() != null) address.setState(addressDto.getState());
        if (addressDto.getZipCode() != null) address.setZipCode(addressDto.getZipCode());
        if (addressDto.getCountry() != null) address.setCountry(addressDto.getCountry());

        addressRepo.save(address);

        String message = (user.getAddress() == null) ? "New address created successfully" : "Address updated successfully";
        return Response.builder()
                .status(200)
                .message(message)
                .build();
    }
}

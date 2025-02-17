package com.JGalaxy.JGalaxy.service.User;

import com.JGalaxy.JGalaxy.dto.LoginRequest;
import com.JGalaxy.JGalaxy.dto.Response;
import com.JGalaxy.JGalaxy.dto.UserDto;
import com.JGalaxy.JGalaxy.entity.User;

public interface IUserService {
    Response registerUser(UserDto user);
    Response loginUser(LoginRequest loginRequest);
    Response getAllUsers();
    User getLoginUser();
    Response getUserInfoAndOrderHistory();
}

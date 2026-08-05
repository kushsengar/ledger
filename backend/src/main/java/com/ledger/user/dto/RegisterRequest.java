package com.ledger.user.dto;
import com.ledger.common.enums.Role;
public record RegisterRequest(String username, String password, String email, String fullName, Role role) {}

package com.ledger.user.dto;
import com.ledger.common.enums.Role;
public record AuthResponse(String token, String username, Role role, String fullName) {}

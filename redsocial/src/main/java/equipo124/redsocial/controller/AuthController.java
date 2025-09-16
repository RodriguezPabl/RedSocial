package equipo124.redsocial.controller;

import equipo124.redsocial.dto.AuthRequest;
import equipo124.redsocial.dto.AuthResponse;
import equipo124.redsocial.model.User;
import equipo124.redsocial.service.UserService;
import equipo124.redsocial.util.JwtUtil;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
	private final UserService userService;
	private final AuthenticationManager authenticationManager;
	private final JwtUtil jwtUtil;
	
	public AuthController(UserService userService, AuthenticationManager authManager, JwtUtil jwtUtil) {
		this.userService = userService;
		this.authenticationManager = authManager;
		this.jwtUtil = jwtUtil;
	}
	
	@PostMapping("/register")
	public ResponseEntity<?> register(@RequestBody AuthRequest req) {
		if(userService.findByUsername(req.getUsername()).isPresent()) {
			return ResponseEntity.badRequest().body("Nombre de usuario ya en uso");
		}
		User u = userService.register(req.getUsername(), req.getPassword());
		return ResponseEntity.ok("Usuario creado: " + u.getUsername());
	}
	
	@PostMapping("login")
	public ResponseEntity<?> login(@RequestBody AuthRequest req) {
		try {
			authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(req.getUsername(), req.getPassword()));
			String token = jwtUtil.generateToken(req.getUsername());
			return ResponseEntity.ok(new AuthResponse(token));
		}
		catch (AuthenticationException ex){
			return ResponseEntity.status(401).body("Credenciales invalidas");
		}
	}
}

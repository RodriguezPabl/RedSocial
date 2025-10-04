package equipo124.redsocial.controller;

import equipo124.redsocial.model.Post;
import equipo124.redsocial.model.User;
import equipo124.redsocial.service.PostService;
import equipo124.redsocial.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

@RestController
@RequestMapping("/redsocial/posts")
public class PostController {

    private final PostService postService;
    private final UserService userService;

    public PostController(PostService postService, UserService userService) {
        this.postService = postService;
        this.userService = userService;
    }

    //Crear post con texto + imagen (opcional)
    @PostMapping( consumes = {"multipart/form-data"})
    public ResponseEntity<Post> createPost(
            @RequestParam("content") String content,
            @RequestParam(value = "image", required = false) MultipartFile image,
            Authentication auth) throws IOException {

        User user = userService.findByUsername(auth.getName())
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        String imageUrl = null;
        if (image != null && !image.isEmpty()) {
            String uploadsDir = "uploads/";
            Path uploadPath = Paths.get(uploadsDir);

            if (!Files.exists(uploadPath)) {
                Files.createDirectories(uploadPath);
            }

            String fileName = System.currentTimeMillis() + "_" + image.getOriginalFilename();
            Path filePath = uploadPath.resolve(fileName);
            image.transferTo(filePath.toFile());

            // URL pública de la imagen
            imageUrl = "/uploads/" + fileName;
        }

        Post post = postService.createPost(user, content, imageUrl);
        return ResponseEntity.ok(post);
    }

    //Obtener todos los posts
    @GetMapping
    public ResponseEntity<List<Post>> getAllPosts() {
    	List<Post> posts = postService.getAllPosts();
        posts.sort((a, b) -> b.getCreatedAt().compareTo(a.getCreatedAt())); // orden descendente
        return ResponseEntity.ok(postService.getAllPosts());
    }
}
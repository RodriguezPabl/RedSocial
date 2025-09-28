package equipo124.redsocial.repository;

import equipo124.redsocial.model.Post;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface PostRepository extends JpaRepository<Post, Long> {
    List<Post> findByUserUsername(String username);
}
package equipo124.redsocial.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {
    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        // Permite acceder a imágenes subidas en http://localhost:8080/uploads/{archivo}
        registry.addResourceHandler("/uploads/**")
                .addResourceLocations("file:uploads/");
    }
}
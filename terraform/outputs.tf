output "cloudfront_domain" {
  value       = aws_cloudfront_distribution.cdn.domain_name
  description = "URL publica de tu aplicacion frontend"
}

output "cloudfront_distribution_id" {
  value       = aws_cloudfront_distribution.cdn.id
  description = "El ID de la distribucion necesario para las Actions de GitHub"
}
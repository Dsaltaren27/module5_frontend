output "s3_bucket_id" {
  description = "ID del bucket de S3 creado"
  value       = aws_s3_bucket.frontend_bucket.id
}

output "cloudfront_domain" {
  value       = aws_cloudfront_distribution.cdn.domain_name
  description = "URL publica de tu aplicacion frontend"
}

output "cloudfront_distribution_id" {
  value       = aws_cloudfront_distribution.cdn.id
  description = "El ID de la distribucion necesario para las Actions de GitHub"
}
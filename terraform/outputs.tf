output "s3_bucket_id" {
  description = "ID del bucket S3 creado"
  value       = aws_s3_bucket.frontend_bucket.id
}

output "cloudfront_domain" {
  description = "URL pública de la aplicación frontend"
  value       = "https://${aws_cloudfront_distribution.cdn.domain_name}"
}

output "cloudfront_distribution_id" {
  description = "ID de la distribución CloudFront (necesario para GitHub Actions)"
  value       = aws_cloudfront_distribution.cdn.id
}

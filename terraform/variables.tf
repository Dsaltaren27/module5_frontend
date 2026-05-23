variable "aws_region" {
  type        = string
  description = "Región de AWS donde se desplegarán los recursos del frontend"
  default     = "us-east-1"
}

variable "bucket_name" {
  type        = string
  description = "Nombre único a nivel global para el bucket S3 que alojará la SPA de Angular"
}

variable "environment" {
  type        = string
  description = "Ambiente de despliegue "
  default     = "prod"
}

variable "project_name" {
  type        = string
  description = "Nombre del proyecto para etiquetar los recursos"
  default     = "url-shortener-serverless"
}
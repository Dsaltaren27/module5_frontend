terraform {
  required_version = ">= 1.0.0"
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }

# Comenta esto para asegurar el parcial sin caídas de red:
  # backend "s3" {
  #   bucket = "url-shortener-frontend-parcial3"
  #   key    = "module5_frontend/terraform.tfstate"
  #   region = "us-east-1"
  # }
}
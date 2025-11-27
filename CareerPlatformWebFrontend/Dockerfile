# Multi-stage build for React app without requiring local .env files

# 1) Build stage
FROM node:18-alpine AS build

WORKDIR /app
COPY package.json package-lock.json* yarn.lock* ./
# Prefer npm if lockfile exists; this works even if no lockfiles are present
RUN if [ -f package-lock.json ]; then npm ci; elif [ -f yarn.lock ]; then yarn install --frozen-lockfile; else npm install; fi

# Copy source
COPY . .

# Build without requiring .env. CRA picks up REACT_APP_* defined at build-time if provided.
# No 'cat' of any env files here; this must succeed with no .env present.
RUN npm run build

# 2) Runtime stage using nginx
FROM nginx:alpine AS runtime
WORKDIR /usr/share/nginx/html

# Remove default static content and copy our build
RUN rm -rf ./*
COPY --from=build /app/build /usr/share/nginx/html

# Provide an optional runtime env override file for future use; not required
# If you later add an env.js, make sure the index.html references it before the main bundle.
# For now, no runtime injection is required; CRA bundle already contains REACT_APP_* baked in at build-time.

# Expose port and start nginx
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

export const pipelineSteps = [
  { title: "Commit & Pull Request", icon: "pr", detail: "Source changes land through a reviewed pull request with branch protections, clear ownership, and traceability before release automation begins.", tags: ["Git", "review", "ownership"] },
  { title: "CI Build", icon: "build", detail: "The pipeline runs application checks, unit tests, type checks, and builds a Docker image so the same artifact can move through each environment.", tags: ["tests", "Docker", "artifact"] },
  { title: "Security Gates", icon: "security", detail: "Dependency, container, and policy scans catch vulnerabilities early and create a clean handoff into enterprise deployment standards.", tags: ["SCA", "image scan", "policy"] },
  { title: "Image Registry", icon: "registry", detail: "A tagged image is pushed to the registry with immutable versioning, making rollbacks and environment promotion predictable.", tags: ["registry", "tags", "rollback"] },
  { title: "Helm Package", icon: "helm", detail: "Helm values define the service, ingress, secrets references, resources, probes, and environment-specific runtime configuration.", tags: ["Helm", "values", "Kubernetes"] },
  { title: "Harness / Actions Deploy", icon: "deploy", detail: "Release automation coordinates approvals, promotion, audit history, and repeatable deployment steps across environments.", tags: ["Harness", "GitHub Actions", "approval"] },
  { title: "EKS Rollout", icon: "eks", detail: "Kubernetes applies deployments, services, config maps, autoscaling rules, and rollout health checks inside the EKS cluster.", tags: ["EKS", "rollout", "autoscaling"] },
  { title: "Data Layer", icon: "data", detail: "PostgreSQL, Redis, and service configuration are validated so the app can connect safely without hard-coded runtime secrets.", tags: ["PostgreSQL", "Redis", "secrets"] },
  { title: "Observability", icon: "observability", detail: "Grafana dashboards, logs, metrics, alerts, and health checks make production behavior visible before users report trouble.", tags: ["Grafana", "alerts", "SLOs"] },
  { title: "Production Readiness", icon: "production", detail: "Runbooks, disaster recovery posture, ownership, and rollback paths turn a deployment into an operated production service.", tags: ["runbooks", "DR", "operations"] }
];

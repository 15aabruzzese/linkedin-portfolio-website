export const eksLayers = [
  {
    name: "Ingress & Entry",
    description: "How production traffic enters AWS and reaches Kubernetes services.",
    components: [
      { title: "Internet / Route 53", icon: "dns", detail: "Public hostnames resolve through Route 53 and direct users to the internet-facing entrypoint for the platform.", tags: ["Route 53", "DNS", "ingress"] },
      { title: "AWS WAF (Optional)", icon: "shield", detail: "Optional WAF policies inspect and filter requests before they reach the public application load balancer.", tags: ["WAF", "filtering", "edge security"] },
      { title: "Public ALB", icon: "loadbalancer", detail: "A public Application Load Balancer spans public subnets across availability zones, terminates TLS, and forwards requests toward Kubernetes ingress.", tags: ["ALB", "TLS", "public subnets"] },
      { title: "AWS Load Balancer Controller", icon: "ingress", detail: "The AWS Load Balancer Controller reconciles Kubernetes ingress and service resources into AWS load balancer configuration.", tags: ["controller", "ALB", "reconciliation"] },
      { title: "Kubernetes Ingress", icon: "ingress", detail: "Ingress resources define host and path routing inside the cluster and connect the external ALB path to internal Kubernetes services.", tags: ["Ingress", "routing", "hosts"] },
      { title: "Kubernetes Service", icon: "services", detail: "ClusterIP or internal service objects provide stable service discovery and load balance traffic to healthy pods across worker nodes.", tags: ["Service", "ClusterIP", "east-west"] },
      { title: "Kubernetes Workloads", icon: "pods", detail: "Deployments and pods such as frontend, checkout, payment, and catalog are scheduled across private subnets in multiple availability zones.", tags: ["pods", "deployments", "multi-AZ"] }
    ]
  },
  {
    name: "Cluster & Networking",
    description: "The managed cluster, private worker nodes, and network controls that keep EKS running safely.",
    components: [
      { title: "EKS Control Plane", icon: "controlplane", detail: "The Amazon EKS managed control plane runs outside the customer VPC and provides the Kubernetes API, etcd, and scheduling backbone.", tags: ["API server", "etcd", "managed"] },
      { title: "Internet Gateway", icon: "network", detail: "The internet gateway provides north-south connectivity for public subnet resources such as the ALB and NAT gateways.", tags: ["IGW", "public routing", "VPC"] },
      { title: "NAT Gateway", icon: "transit", detail: "NAT gateways in public subnets let private worker nodes reach external services such as ECR without becoming internet-addressable themselves.", tags: ["NAT", "egress", "private subnets"] },
      { title: "EC2 Worker Nodes", icon: "nodes", detail: "Private-subnet EC2 worker nodes host Kubernetes pods in managed node groups across both availability zones.", tags: ["EC2", "managed node groups", "private subnets"] },
      { title: "IRSA / IAM Roles", icon: "identity", detail: "IAM Roles for Service Accounts let pods assume fine-grained AWS permissions without storing long-lived credentials inside containers.", tags: ["IRSA", "IAM", "federation"] },
      { title: "Cluster Autoscaler / Karpenter", icon: "autoscaling", detail: "Autoscaling adds or removes nodes based on pending workloads so the platform can stay efficient without starving deployments.", tags: ["capacity", "binpacking", "efficiency"] }
    ]
  },
  {
    name: "Delivery & Platform Ops",
    description: "How images and releases get into the cluster and how the platform is observed.",
    components: [
      { title: "GitHub Actions / CI-CD", icon: "deploy", detail: "CI/CD automation validates code, builds container images, and promotes releases toward the cluster using repeatable deployment workflows.", tags: ["CI/CD", "automation", "promotion"] },
      { title: "Amazon ECR", icon: "registry", detail: "Amazon ECR stores the versioned container images that worker nodes pull during deployments.", tags: ["ECR", "images", "registry"] },
      { title: "Helm Release", icon: "helm", detail: "Helm packages Kubernetes manifests and values so releases can be promoted consistently into EKS environments.", tags: ["Helm", "charts", "release"] },
      { title: "CloudWatch / Container Insights", icon: "observability", detail: "CloudWatch and Container Insights collect logs, metrics, and cluster telemetry for production monitoring and troubleshooting.", tags: ["CloudWatch", "logs", "metrics"] },
      { title: "CoreDNS", icon: "addons", detail: "CoreDNS handles cluster-internal DNS so services and pods can discover one another reliably.", tags: ["CoreDNS", "DNS", "cluster service"] },
      { title: "Amazon VPC CNI", icon: "network", detail: "The Amazon VPC CNI add-on assigns VPC-routable IP addresses to pods and connects Kubernetes workloads into AWS networking.", tags: ["VPC CNI", "pod IPs", "networking"] },
      { title: "AWS Load Balancer Controller", icon: "ingress", detail: "The AWS Load Balancer Controller provisions and updates the ALB and target groups from Kubernetes ingress resources, but it is not in the runtime traffic path.", tags: ["controller", "ALB", "ingress"] }
    ]
  },
  {
    name: "Data, Secrets & Runtime",
    description: "Managed data services and application configuration used by the workloads.",
    components: [
      { title: "Amazon Aurora / RDS PostgreSQL", icon: "data", detail: "Production relational data should live in a managed PostgreSQL service such as Amazon Aurora or RDS rather than inside Kubernetes workloads.", tags: ["Aurora", "RDS", "PostgreSQL"] },
      { title: "Amazon ElastiCache Redis", icon: "data", detail: "Redis caching is typically provided by Amazon ElastiCache as a managed service outside the worker-node runtime.", tags: ["ElastiCache", "Redis", "cache"] },
      { title: "ConfigMaps / Kubernetes Secrets", icon: "config", detail: "Pods receive non-sensitive config from ConfigMaps and cluster-native secret material from Kubernetes Secrets where appropriate.", tags: ["ConfigMap", "Kubernetes Secrets", "runtime config"] },
      { title: "AWS Secrets Manager / External Secrets", icon: "vault", detail: "External secret synchronization patterns pull credentials from AWS Secrets Manager into Kubernetes when teams do not use Vault directly.", tags: ["Secrets Manager", "External Secrets", "credentials"] },
      { title: "Optional Service Mesh", icon: "services", detail: "A service mesh can be added for advanced east-west policy, mTLS, and traffic shaping, but it is optional and not required for every EKS platform.", tags: ["optional", "mTLS", "traffic policy"] }
    ]
  }
];

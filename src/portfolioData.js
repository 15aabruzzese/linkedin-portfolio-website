export const contact = {
  location: "Charles Town, West Virginia",
  email: "andrew.abruzzese@outlook.com",
  linkedin: "linkedin.com/in/andrew-abruzzese-3619b1157",
  linkedinUrl: "https://linkedin.com/in/andrew-abruzzese-3619b1157"
};

export const photos = [
  {
    src: "assets/photos/optimized/nyc-street.jpg",
    title: "City Systems",
    caption: "Street-level architecture, light, and motion.",
    alt: "New York City street lined with tall buildings and traffic."
  },
  {
    src: "assets/photos/optimized/nyc-skyline.jpg",
    title: "Scale From Above",
    caption: "A skyline view with the kind of complexity infrastructure people appreciate.",
    alt: "A high aerial view of the New York City skyline."
  },
  {
    src: "assets/photos/optimized/sky-bubbles.jpg",
    title: "Reflections",
    caption: "Glass, skyline, and a little engineered spectacle.",
    alt: "Reflective silver balloons hanging near a city skyline observation area."
  },
  {
    src: "assets/photos/optimized/snow-street-wide.jpg",
    title: "Quiet Reliability",
    caption: "Snowy streets and warm lights after the storm.",
    alt: "Snow-covered neighborhood street at night under warm street lights."
  },
  {
    src: "assets/photos/optimized/snow-walkway.jpg",
    title: "Clear Path",
    caption: "A winter sidewalk framed by trees and row homes.",
    alt: "Snow-covered sidewalk at night with trees and parked cars."
  },
  {
    src: "assets/photos/optimized/snow-walkway-landscape.jpg",
    title: "Night Runway",
    caption: "A long perspective line through fresh snow.",
    alt: "Landscape view of a snowy sidewalk at night."
  },
  {
    src: "assets/photos/optimized/boardwalk-sunset.jpg",
    title: "Release Path",
    caption: "A boardwalk vanishing point under a pastel sky.",
    alt: "Wooden boardwalk leading into the distance under a colorful cloudy sky."
  },
  {
    src: "assets/photos/optimized/boardwalk-water.jpg",
    title: "Through The Trees",
    caption: "A calm path toward open water.",
    alt: "Wooden boardwalk through trees leading toward water."
  },
  {
    src: "assets/photos/optimized/mountain-town-night.jpg",
    title: "Operational Glow",
    caption: "Water, light, and mountain-town energy at night.",
    alt: "Night scene of a mountain town with a creek and illuminated buildings."
  },
  {
    src: "assets/photos/optimized/usc-stadium.jpg",
    title: "Game Day Scale",
    caption: "A packed stadium, built for throughput.",
    alt: "A packed football stadium during a sunny game day."
  },
  {
    src: "assets/photos/optimized/mountain-lake.jpg",
    title: "Alpine Calm",
    caption: "Mountain water and a wider horizon.",
    alt: "Mountain lake bordered by pine forests and clouds."
  },
  {
    src: "assets/photos/optimized/mountain-road.jpg",
    title: "Roadmap",
    caption: "A mountain road heading into open terrain.",
    alt: "A winding dirt road through a mountain valley."
  }
];

export const pipelineSteps = [
  {
    title: "Commit & Pull Request",
    icon: "pr",
    detail:
      "Source changes land through a reviewed pull request with branch protections, clear ownership, and traceability before release automation begins.",
    tags: ["Git", "review", "ownership"]
  },
  {
    title: "CI Build",
    icon: "build",
    detail:
      "The pipeline runs application checks, unit tests, type checks, and builds a Docker image so the same artifact can move through each environment.",
    tags: ["tests", "Docker", "artifact"]
  },
  {
    title: "Security Gates",
    icon: "security",
    detail:
      "Dependency, container, and policy scans catch vulnerabilities early and create a clean handoff into enterprise deployment standards.",
    tags: ["SCA", "image scan", "policy"]
  },
  {
    title: "Image Registry",
    icon: "registry",
    detail:
      "A tagged image is pushed to the registry with immutable versioning, making rollbacks and environment promotion predictable.",
    tags: ["registry", "tags", "rollback"]
  },
  {
    title: "Helm Package",
    icon: "helm",
    detail:
      "Helm values define the service, ingress, secrets references, resources, probes, and environment-specific runtime configuration.",
    tags: ["Helm", "values", "Kubernetes"]
  },
  {
    title: "Harness / Actions Deploy",
    icon: "deploy",
    detail:
      "Release automation coordinates approvals, promotion, audit history, and repeatable deployment steps across environments.",
    tags: ["Harness", "GitHub Actions", "approval"]
  },
  {
    title: "EKS Rollout",
    icon: "eks",
    detail:
      "Kubernetes applies deployments, services, config maps, autoscaling rules, and rollout health checks inside the EKS cluster.",
    tags: ["EKS", "rollout", "autoscaling"]
  },
  {
    title: "Data Layer",
    icon: "data",
    detail:
      "PostgreSQL, Redis, and service configuration are validated so the app can connect safely without hard-coded runtime secrets.",
    tags: ["PostgreSQL", "Redis", "secrets"]
  },
  {
    title: "Observability",
    icon: "observability",
    detail:
      "Grafana dashboards, logs, metrics, alerts, and health checks make production behavior visible before users report trouble.",
    tags: ["Grafana", "alerts", "SLOs"]
  },
  {
    title: "Production Readiness",
    icon: "production",
    detail:
      "Runbooks, disaster recovery posture, ownership, and rollback paths turn a deployment into an operated production service.",
    tags: ["runbooks", "DR", "operations"]
  }
];

export const eksLayers = [
  {
    name: "Edge & Entry",
    description: "The north-south path that receives traffic and gets it safely into the cluster.",
    components: [
      {
        title: "Route 53 DNS",
        icon: "dns",
        detail:
          "Public DNS records route traffic to the environment entrypoint and make cutovers, failover, and certificate-backed hostnames manageable.",
        tags: ["DNS", "hostnames", "routing"]
      },
      {
        title: "AWS WAF / Shield",
        icon: "shield",
        detail:
          "Edge protection filters common web attacks, rate-limits abusive traffic, and adds another security layer before requests ever reach the cluster.",
        tags: ["WAF", "DDoS", "rate limits"]
      },
      {
        title: "Application Load Balancer",
        icon: "loadbalancer",
        detail:
          "The ALB terminates TLS, applies listener rules, and forwards traffic into Kubernetes ingress targets for service-level routing.",
        tags: ["ALB", "TLS", "listeners"]
      },
      {
        title: "Ingress Controller",
        icon: "ingress",
        detail:
          "The ingress controller translates Kubernetes ingress resources into cloud load balancer behavior so applications can expose stable, policy-driven endpoints.",
        tags: ["Ingress", "rules", "paths"]
      }
    ]
  },
  {
    name: "Platform Core",
    description: "Managed control-plane services and cluster-level operators that define how workloads run.",
    components: [
      {
        title: "EKS Control Plane",
        icon: "controlplane",
        detail:
          "AWS manages the Kubernetes API server, etcd, and scheduler backbone, giving the cluster a reliable control layer without self-hosting the masters.",
        tags: ["API server", "etcd", "managed"]
      },
      {
        title: "Managed Node Groups",
        icon: "nodes",
        detail:
          "Worker nodes provide the compute for pods while letting teams standardize AMIs, scaling behavior, and patching across environments.",
        tags: ["EC2", "workers", "scaling"]
      },
      {
        title: "Cluster Autoscaler / Karpenter",
        icon: "autoscaling",
        detail:
          "Autoscaling adds or removes nodes based on pending workloads so the platform can stay efficient without starving deployments.",
        tags: ["capacity", "binpacking", "efficiency"]
      },
      {
        title: "Core Add-ons",
        icon: "addons",
        detail:
          "Services like CoreDNS, kube-proxy, VPC CNI, and metrics collection keep networking, service discovery, and scheduling healthy inside the cluster.",
        tags: ["CoreDNS", "CNI", "metrics"]
      }
    ]
  },
  {
    name: "Workloads & Release",
    description: "The application plane where services are deployed, configured, and promoted.",
    components: [
      {
        title: "Namespaces & RBAC",
        icon: "rbac",
        detail:
          "Namespaces segment environments and teams, while RBAC keeps deployment permissions scoped to the right people and automation identities.",
        tags: ["multi-team", "least privilege", "access"]
      },
      {
        title: "Deployments & Pods",
        icon: "pods",
        detail:
          "Deployments manage desired state, replicas, and rollout strategy while pods run the actual microservice containers and sidecars.",
        tags: ["replicas", "rollouts", "containers"]
      },
      {
        title: "Services & Mesh Boundaries",
        icon: "services",
        detail:
          "Cluster services provide stable internal discovery and traffic routing between microservices, regardless of where individual pods land.",
        tags: ["service discovery", "east-west", "resilience"]
      },
      {
        title: "Helm Release Layer",
        icon: "helm",
        detail:
          "Helm packages templates, values, and environment overrides so the same application can be deployed consistently across lower and production environments.",
        tags: ["charts", "values", "promotion"]
      }
    ]
  },
  {
    name: "Secrets, Data & Identity",
    description: "The dependency layer that keeps configuration, credentials, and shared services under control.",
    components: [
      {
        title: "HashiCorp Vault",
        icon: "vault",
        detail:
          "Vault brokers secrets centrally so applications fetch short-lived credentials and sensitive values without hard-coding them into images or manifests.",
        tags: ["secrets", "dynamic creds", "rotation"]
      },
      {
        title: "IRSA / IAM Roles",
        icon: "identity",
        detail:
          "IAM Roles for Service Accounts give workloads cloud permissions through federated identity, avoiding static AWS keys in containers.",
        tags: ["IRSA", "IAM", "federation"]
      },
      {
        title: "PostgreSQL / Redis",
        icon: "data",
        detail:
          "Stateful dependencies live outside the ephemeral pod lifecycle and are wired in through service configuration, network policy, and secret-backed credentials.",
        tags: ["PostgreSQL", "Redis", "state"]
      },
      {
        title: "ConfigMaps & Secret Sync",
        icon: "config",
        detail:
          "Runtime configuration is injected through Kubernetes-native objects so services can be tuned without rebuilding container images.",
        tags: ["ConfigMap", "external secrets", "runtime"]
      }
    ]
  },
  {
    name: "Network, Security & Operations",
    description: "The connective tissue that makes enterprise traffic, observability, and recovery production-ready.",
    components: [
      {
        title: "VPC & Private Subnets",
        icon: "network",
        detail:
          "Private subnets, routing tables, and security groups isolate cluster resources while still allowing controlled access to shared enterprise services.",
        tags: ["VPC", "subnets", "security groups"]
      },
      {
        title: "Transit Gateway",
        icon: "transit",
        detail:
          "Transit Gateway connects the cluster VPC to enterprise networks, shared services, and upstream platforms without hand-managing one-off peering sprawl.",
        tags: ["TGW", "east-west", "enterprise"]
      },
      {
        title: "Observability Stack",
        icon: "observability",
        detail:
          "Metrics, logs, traces, dashboards, and alerts turn runtime behavior into something teams can actually operate before incidents become visible to users.",
        tags: ["Grafana", "logs", "alerts"]
      },
      {
        title: "Backup, DR & Runbooks",
        icon: "operations",
        detail:
          "Snapshot strategy, restore paths, disaster recovery posture, and clear runbooks define how the platform behaves when something fails for real.",
        tags: ["backup", "DR", "runbooks"]
      }
    ]
  }
];

export const experience = [
  {
    company: "Marriott International",
    title: "DevOps Engineer",
    date: "Jun 2024 - Present",
    summary:
      "Leading cloud-native platform and microservice delivery across FastAPI, EKS, Kubernetes, Docker, Helm, PostgreSQL, Redis, and AWS.",
    impact: [
      "MVP desktop platform with Electron and FastAPI",
      "Four production FastAPI services and centralized auth",
      "Grafana compliance platform across roughly 31k network devices"
    ]
  },
  {
    company: "Marriott International",
    title: "Network Automation Analyst",
    date: "2024",
    summary:
      "Owned EKS operations for network automation platforms and established CI/CD patterns that improved deployment consistency.",
    impact: [
      "Migrated delivery standards from GitHub Actions to Harness",
      "Supported Nautobot SSoT platform operations",
      "Implemented DR, alerting, and monitoring readiness"
    ]
  },
  {
    company: "Marriott International",
    title: "Network DevOps Intern",
    date: "2023 - 2024",
    summary:
      "Built event-driven automation concepts and reusable CI/CD workflows for network automation repositories.",
    impact: [
      "Java Spring Boot microservices with Kafka and Ansible",
      "Reusable GitHub Actions workflows",
      "Ansible Execution Environment publishing automation"
    ]
  },
  {
    company: "JLG Industries",
    title: "Mobile Application / DevOps Intern",
    date: "May 2023 - Nov 2023",
    summary:
      "Developed CI/CD pipelines, REST APIs, internal web applications, and mobile deployment automation across enterprise apps.",
    impact: [
      "AKS microservice pipelines with GitHub Actions and Docker",
      "Spring Boot APIs for SSO initiatives",
      "Next.js, TypeScript, Angular, Ionic, and Capacitor delivery"
    ]
  }
];

export const skills = [
  {
    category: "Cloud & Containers",
    items: ["AWS", "EKS", "Kubernetes", "Docker", "Helm", "AKS"]
  },
  {
    category: "Backend & Data",
    items: ["FastAPI", "Python", "Java Spring Boot", "PostgreSQL", "Redis", "REST APIs"]
  },
  {
    category: "Delivery & Operations",
    items: ["Harness", "GitHub Actions", "Grafana", "SSO", "DR", "Monitoring"]
  },
  {
    category: "Frontend & Platforms",
    items: ["TypeScript", "Next.js", "Electron", "Angular", "Ionic", "Capacitor"]
  }
];

export const featuredProject = {
  title: "Comparing Computer Vision Architectures",
  summary:
    "Compared CNN and Vision Transformer architectures on CIFAR-10, CIFAR-100, and Tiny ImageNet, evaluating model accuracy, runtime, and statistical significance with PyTorch.",
  highlights: ["PyTorch experimentation", "CNN vs. ViT analysis", "Runtime and accuracy evaluation"]
};

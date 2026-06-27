import { useMemo, useState } from "react";
import { Network, Users } from "lucide-react";
import { eksLayers } from "../data";
import { architectureIconMap } from "../lib/iconMaps";

const trafficCards = [
  { title: "Internet / Route 53", label: "Route 53 / Internet" },
  { title: "AWS WAF (Optional)", label: "Optional WAF" },
  { title: "Public ALB", label: "Internet-facing ALB" },
  { title: "Kubernetes Ingress", label: "Ingress" },
  { title: "Kubernetes Service", label: "Service" }
];

const managementCards = [
  { title: "Kubernetes Service", label: "Service", caption: "Workloads" },
  { title: "Amazon ECR", label: "Amazon ECR" },
  { title: "Helm Release", label: "Helm" },
  { title: "EKS Control Plane", label: "EKS", caption: "Kubernetes API" }
];

const clusterServiceCards = [
  { title: "AWS Load Balancer Controller", label: "AWS LB Controller" },
  { title: "CoreDNS", label: "CoreDNS" },
  { title: "Amazon VPC CNI", label: "Amazon VPC CNI" }
];

const managedServiceCards = [
  { title: "Amazon Aurora / RDS PostgreSQL", label: "Aurora / RDS PostgreSQL" },
  { title: "Amazon ElastiCache Redis", label: "ElastiCache Redis" },
  { title: "AWS Secrets Manager / External Secrets", label: "Secrets Manager" },
  { title: "CloudWatch / Container Insights", label: "CloudWatch / Insights" },
  { title: "IRSA / IAM Roles", label: "IAM / IRSA" }
];

const zones = [
  { name: "Availability Zone A", publicTitle: "NAT Gateway", publicBadge: "ALB ENI", workerBadge: "EKS Managed Node Group" },
  { name: "Availability Zone B", publicTitle: "NAT Gateway", publicBadge: "ALB ENI", workerBadge: "EKS Managed Node Group" }
];

const workloadCards = [
  { title: "Kubernetes Workloads", label: "frontend", caption: "Deployment" },
  { title: "Kubernetes Workloads", label: "checkout", caption: "Deployment" },
  { title: "Kubernetes Workloads", label: "payment", caption: "Deployment" },
  { title: "Kubernetes Workloads", label: "catalog", caption: "Deployment" }
];

const clusterResourceCards = [
  { title: "ConfigMaps / Kubernetes Secrets", label: "ConfigMaps /", caption: "Kubernetes Secrets" },
  { title: "Optional Service Mesh", label: "Optional Service Mesh", caption: "Istio, Linkerd" }
];

const inlinePopupGroups = new Set(["traffic-group", "management-group"]);

export default function EksArchitecture() {
  const componentLookup = useMemo(
    () =>
      eksLayers.flatMap((layer, layerIndex) =>
        layer.components.map((component, componentIndex) => ({
          layer,
          layerIndex,
          component,
          componentIndex
        }))
      ),
    []
  );
  const [activeTitle, setActiveTitle] = useState("Public ALB");
  const [hoveredGroup, setHoveredGroup] = useState(null);

  const activateTitle = (title) => setActiveTitle(title);

  const clearGroupIfLeaving = (event, groupKey) => {
    if (!event.currentTarget.contains(event.relatedTarget)) {
      setHoveredGroup((currentGroup) => (currentGroup === groupKey ? null : currentGroup));
    }
  };

  const groupHandlers = (groupKey) => ({
    onMouseLeave: () => setHoveredGroup((currentGroup) => (currentGroup === groupKey ? null : currentGroup)),
    onBlur: (event) => clearGroupIfLeaving(event, groupKey)
  });

  const renderGroupPopup = (groupKey, titles, extraClass = "") => {
    if (hoveredGroup !== groupKey || !titles.includes(activeTitle)) return null;

    const entry = componentLookup.find((componentEntry) => componentEntry.component.title === activeTitle);
    if (!entry) return null;

    return (
      <div className={`eks-group-popout ${extraClass}`.trim()} role="tooltip">
        <span className="eks-group-popout-layer">{entry.layer.name}</span>
        <span className="eks-group-popout-title">{entry.component.title}</span>
        <span className="eks-group-popout-body">{entry.component.detail}</span>
      </div>
    );
  };

  const renderCard = (title, label, extraClass = "", caption = "", keySuffix = "", groupKey = "") => {
    const entry = componentLookup.find((componentEntry) => componentEntry.component.title === title);
    const Icon = architectureIconMap[entry?.component.icon];
    const isActive = activeTitle === title;

    return (
      <button
        key={`${title}-${label}-${caption}-${keySuffix}`}
        type="button"
        className={`eks-card ${extraClass} ${isActive ? "active" : ""}`.trim()}
        onMouseEnter={() => {
          activateTitle(title);
          if (groupKey) setHoveredGroup(groupKey);
        }}
        onFocus={() => {
          activateTitle(title);
          if (groupKey) setHoveredGroup(groupKey);
        }}
        onClick={() => {
          activateTitle(title);
          if (groupKey) setHoveredGroup(groupKey);
        }}
        aria-pressed={isActive}
      >
        <span className="eks-card-icon">
          <Icon size={18} aria-hidden="true" />
        </span>
        <span className="eks-card-label">{label}</span>
        {caption ? <span className="eks-card-caption">{caption}</span> : null}
        {entry && inlinePopupGroups.has(groupKey) && hoveredGroup === groupKey && activeTitle === title ? (
          <span className="eks-group-popout eks-inline-popout" role="tooltip">
            <span className="eks-group-popout-layer">{entry.layer.name}</span>
            <span className="eks-group-popout-title">{entry.component.title}</span>
            <span className="eks-group-popout-body">{entry.component.detail}</span>
          </span>
        ) : null}
      </button>
    );
  };

  return (
    <section className="section eks-section" id="eks-architecture">
      <div className="section-heading">
        <span className="section-kicker">Cluster Overview</span>
        <h2>Interactive EKS microservice deployment map</h2>
        <p>
          A production-oriented EKS reference showing ingress, control plane placement,
          private worker nodes across two availability zones, and managed data services.
        </p>
      </div>

      <div className="eks-diagram-shell">
        <div className="eks-diagram-panel">
          <div className="eks-board architecture-board" role="group" aria-label="EKS architecture diagram">
            <div className="eks-cloud-header">
              <div className="eks-cloud-title">
                <span className="eks-aws-badge" aria-hidden="true">aws</span>
                <span>AWS Cloud</span>
              </div>
              <div className="eks-control-plane-box">
                {renderCard("EKS Control Plane", "EKS Managed Control Plane", "control-plane-card wide-node", "AWS manages and scales", "", "control-plane-group")}
                {renderGroupPopup("control-plane-group", ["EKS Control Plane"])}
              </div>
            </div>

            <div className="eks-vpc-board">
              <div className="eks-vpc-title-row">
                <span className="eks-vpc-badge" aria-hidden="true">
                  <Network size={18} />
                </span>
                <span className="eks-vpc-title">VPC</span>
              </div>

              <div className="eks-alb-strip">
                <div className="eks-group-shell" {...groupHandlers("alb-strip-group")}>
                  {renderCard("Public ALB", "Internet-facing Application Load Balancer", "wide-node alb-strip-card", "Spans across both public subnets in multiple AZs", "", "alb-strip-group")}
                  {renderGroupPopup("alb-strip-group", ["Public ALB"])}
                </div>
              </div>

              <div className="eks-az-layout">
                {zones.map((zone) => (
                  <section className="eks-zone-card" key={zone.name}>
                    <div className="eks-zone-title">{zone.name}</div>
                    <div className="eks-subnet-box public" {...groupHandlers(`${zone.name}-public`)}>
                      <div className="eks-subnet-title">Public Subnet</div>
                      <div className="eks-subnet-node-row two-up">
                        {renderCard("Public ALB", zone.publicBadge, "subnet-node", "", "", `${zone.name}-public`)}
                        {renderCard(zone.publicTitle, "NAT Gateway", "subnet-node", "", "", `${zone.name}-public`)}
                      </div>
                      {renderGroupPopup(`${zone.name}-public`, ["Public ALB", "NAT Gateway"])}
                    </div>
                    <div className="eks-zone-arrow" aria-hidden="true">↓</div>
                    <div className="eks-subnet-box private" {...groupHandlers(`${zone.name}-private`)}>
                      <div className="eks-subnet-title">Private Subnet</div>
                      <div className="eks-worker-group">
                        <div className="eks-worker-group-title">Worker Nodes</div>
                        <div className="eks-worker-chip-row">
                          {Array.from({ length: 3 }).map((_, index) =>
                            renderCard("EC2 Worker Nodes", "EC2 Worker Node", "worker-chip", "", `${zone.name}-${index}`, `${zone.name}-private`)
                          )}
                        </div>
                        <div className="eks-worker-caption">{zone.workerBadge}</div>
                      </div>
                      {renderGroupPopup(`${zone.name}-private`, ["EC2 Worker Nodes"])}
                    </div>
                  </section>
                ))}
              </div>

              <div className="eks-cluster-box">
                <div className="eks-cluster-title">Kubernetes Cluster (Across both AZs)</div>

                <div className="eks-cluster-columns">
                  <div className="eks-cluster-panel" {...groupHandlers("cluster-addons-group")}>
                    <div className="eks-cluster-panel-title">Cluster Services / Add-ons</div>
                    <div className="eks-cluster-node-grid addons">
                      {clusterServiceCards.map((card) =>
                        renderCard(card.title, card.label, "cluster-node", "", card.label, "cluster-addons-group")
                      )}
                    </div>
                    {renderGroupPopup("cluster-addons-group", clusterServiceCards.map((card) => card.title))}
                  </div>

                  <div className="eks-cluster-panel" {...groupHandlers("workloads-group")}>
                    <div className="eks-cluster-panel-title">Workloads (Deployments / Pods)</div>
                    <div className="eks-cluster-node-grid workloads-grid">
                      {workloadCards.map((card) =>
                        renderCard(card.title, card.label, "cluster-node", card.caption, card.label, "workloads-group")
                      )}
                    </div>
                    {renderGroupPopup("workloads-group", ["Kubernetes Workloads"])}
                  </div>
                </div>

                <div className="eks-cluster-resources-box" {...groupHandlers("cluster-resources-group")}>
                  <div className="eks-cluster-panel-title">Cluster Resources</div>
                  <div className="eks-cluster-resource-grid">
                    {clusterResourceCards.map((card) =>
                      renderCard(card.title, card.label, "resource-node", card.caption, card.label, "cluster-resources-group")
                    )}
                  </div>
                  {renderGroupPopup("cluster-resources-group", clusterResourceCards.map((card) => card.title))}
                </div>
              </div>
            </div>

            <div className="eks-managed-services" {...groupHandlers("managed-services-group")}>
              <div className="eks-managed-title">Managed AWS Services (Outside the Cluster)</div>
              <div className="eks-managed-grid">
                {managedServiceCards.map((card) =>
                  renderCard(card.title, card.label, "support-card managed-node", "", card.label, "managed-services-group")
                )}
              </div>
              {renderGroupPopup("managed-services-group", managedServiceCards.map((card) => card.title), "group-popout-bottom")}
            </div>
          </div>
        </div>

        <aside className="eks-sidebar">
          <section className="eks-flow-box traffic-box" aria-label="Traffic path into the cluster" {...groupHandlers("traffic-group")}>
            <span className="eks-box-title traffic-title">1. User Traffic Flow</span>
            <div className="eks-step-column">
              <div className="eks-static-node">
                <span className="eks-static-icon">
                  <Users size={20} aria-hidden="true" />
                </span>
                <span className="eks-static-label">User Traffic</span>
              </div>
              {trafficCards.map((card) => (
                <div className="eks-inline-card-wrap" key={card.title}>
                  <span className="eks-step-arrow vertical" aria-hidden="true">↓</span>
                  {renderCard(card.title, card.label, "flow-card compact-flow-card", "", "", "traffic-group")}
                </div>
              ))}
            </div>
          </section>

          <div className="eks-controller-note" aria-label="Load balancer controller note" {...groupHandlers("controller-group")}>
            <div className="eks-controller-link" aria-hidden="true" />
            {renderCard("AWS Load Balancer Controller", "AWS Load Balancer Controller", "controller-card", "Manages ALB and target groups", "", "controller-group")}
            {renderGroupPopup("controller-group", ["AWS Load Balancer Controller"])}
          </div>

          <section className="eks-flow-box management-box" aria-label="Management note" {...groupHandlers("management-group")}>
            <span className="eks-box-title management-title">2. Management Note</span>
            <div className="eks-step-column">
              {managementCards.map((card, index) => (
                <div className="eks-inline-card-wrap" key={card.title}>
                  {index > 0 ? <span className="eks-step-arrow vertical" aria-hidden="true">↓</span> : null}
                  {renderCard(card.title, card.label, "flow-card compact-flow-card", card.caption, "", "management-group")}
                </div>
              ))}
            </div>
          </section>
        </aside>
      </div>
    </section>
  );
}


export const sent_to_focalpoint = [
    {
      name: "lvform",
      label: "Lvform",
      bind: {
        required: true,
      },
      type: "string",
      "wq:ForeignKey": "lvform",
    },
    {
      name: "cluster_sector",
      label: "Cluster Sector",
      type: "string",
      "wq:ForeignKey": "clustersector",
      children: "cluster_agency",
    },
    {
      name: "cluster_agency",
      label: "Cluster Agency",
      type: "string",
      children: "cluster_region",
      "wq:ForeignKey": "cluster_agency",
      has_parent: true,
    },
    {
      name: "cluster_region",
      label: "Cluster Region",
      type: "string",
      has_parent: true,
      children: "focalpoints",
      "wq:ForeignKey": "cluster_region",
    },
    {
      name: "focalpoint",
      label: "Focal Point",
      bind: {
        required: true,
      },
      hint: "User",
      type: "string",
      "wq:ForeignKey": "focalpoints",
      has_parent: true,
    },
  ],
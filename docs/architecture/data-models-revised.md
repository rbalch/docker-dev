# Data Models (Revised)

## **ScaffoldingConfig**

**Purpose:** This is the central data model for the scaffolding tool. It holds all the user-defined settings collected during the interactive setup process.

### TypeScript Interface
```typescript
export interface ScaffoldingConfig {
  installPath: string;
  projectType: 'greenfield' | 'brownfield';
  appPath?: string;
  useVercel?: boolean;
  adkSupport?: boolean;
}
```

---

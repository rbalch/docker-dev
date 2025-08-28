# 4. Data Models (Revised)

## **ScaffoldingConfig**

**Purpose:** This is the central data model for the scaffolding tool. It holds all the user-defined settings collected during the interactive setup process.

### TypeScript Interface
```typescript
export interface ScaffoldingConfig {
  installPath: string;
  projectType: 'greenfield' | 'brownfield';
  makefile: {
    filename: string;
  };
  brownfield?: {
    existingPath: string;
    importMethod: 'move' | 'copy';
  };
}
```

---

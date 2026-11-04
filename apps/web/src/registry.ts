import type { AdapterManifest } from '@workshop/contracts';

export const adapters: readonly AdapterManifest[] = [
  {
    id: 'freecad',
    contractVersion: 1,
    name: 'FreeCAD',
    capability: 'cad.preview',
    permissions: ['project.read', 'project.write'],
    availability: 'planned',
    upstream: 'https://www.freecad.org/',
    description:
      'Parametric enclosures and mechanical parts. Preserve editable native files.',
  },
  {
    id: 'openmodelica',
    contractVersion: 1,
    name: 'OpenModelica',
    capability: 'physics.estimate',
    permissions: ['project.read'],
    availability: 'planned',
    upstream: 'https://openmodelica.org/',
    description:
      'Dynamic system models with explicit boundary conditions and assumptions.',
  },
  {
    id: 'platformio',
    contractVersion: 1,
    name: 'PlatformIO',
    capability: 'firmware.build',
    permissions: ['project.read', 'project.write', 'network'],
    availability: 'planned',
    upstream: 'https://platformio.org/',
    description:
      'Repeatable embedded builds with pinned boards, libraries, and toolchains.',
  },
  {
    id: 'esptool',
    contractVersion: 1,
    name: 'esptool',
    capability: 'device.flash',
    permissions: ['project.read', 'device.write'],
    availability: 'planned',
    upstream: 'https://docs.espressif.com/projects/esptool/',
    description:
      'A device-specific flashing workflow with target review and verification.',
  },
];

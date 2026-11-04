import { useState } from 'react';
import type { ProjectFile } from '@workshop/contracts';
import { useWorkspace } from './useWorkspace';
import { Projects } from './features/Projects';
import { Bench } from './features/Bench';
import { Brief } from './features/Brief';
import { Evidence } from './features/Evidence';
import { Parts } from './features/Parts';
import { Experiments, Firmware, Tools } from './features/Tools';
import { FeatureBoundary } from './ui';

const buildPages = ['parts', 'firmware', 'experiments'];
export default function App() {
  const [page, setPage] = useState('bench');
  const workspace = useWorkspace();
  const { file, message: notice, setMessage: setNotice } = workspace;
  const { project, parts, briefReviewed } = file;
  const result = file.estimates.at(-1) ?? null;
  function navigate(next: string) {
    if (
      workspace.draftDirty &&
      !window.confirm('Leave this form and discard unapplied edits?')
    )
      return;
    workspace.setDraftDirty(false);
    setPage(next);
  }
  function openProject(next: ProjectFile) {
    if (
      (workspace.dirty || workspace.draftDirty) &&
      !window.confirm(
        'Open another project? Unsaved changes to the current project will be left behind. Save or export first if needed.',
      )
    )
      return;
    workspace.replace(next);
    setPage(next.sampleProject ? 'bench' : 'brief');
  }
  const isBuild = buildPages.includes(page);
  function exportNotes() {
    if (workspace.draftDirty) {
      workspace.setError('Apply your form changes before exporting.');
      return;
    }
    const payload = file;
    const url = URL.createObjectURL(
      new Blob([JSON.stringify(payload, null, 2)], {
        type: 'application/json',
      }),
    );
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = 'open-workshop-project.json';
    anchor.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    setNotice(
      'Project exported, including your brief, budget, parts, and estimate history. Keep this file private if it contains personal information.',
    );
  }
  return (
    <div className="app-layout">
      <a className="skip-link" href="#workspace">
        Skip to workspace
      </a>
      <aside className="sidebar">
        <a
          className="brand"
          href="#"
          onClick={(e) => {
            e.preventDefault();
            navigate('bench');
          }}
          aria-label="Open Workshop home"
        >
          <span className="brand-icon" aria-hidden="true">
            W<span>·</span>
          </span>
          <span>
            Open
            <br />
            Workshop
          </span>
        </a>
        <button className="library-nav" onClick={() => navigate('projects')}>
          ← Your projects
        </button>
        <div className="sidebar-label">YOUR PROJECT</div>
        <nav aria-label="Project sections">
          {[
            ['bench', 'Overview', '◫'],
            ['brief', 'Requirements', '01'],
            ['evidence', 'Feasibility', '02'],
            ['parts', 'Build', '03'],
          ].map(([id, label, icon]) => (
            <button
              key={id}
              aria-current={
                page === id || (id === 'parts' && isBuild) ? 'page' : undefined
              }
              onClick={() => navigate(id)}
            >
              <span className="nav-icon" aria-hidden="true">
                {icon}
              </span>
              {label}
            </button>
          ))}
        </nav>
        <div className="sidebar-bottom">
          <button
            className="tool-nav"
            aria-current={page === 'tools' ? 'page' : undefined}
            onClick={() => navigate('tools')}
          >
            Community tools <span aria-hidden="true">↗</span>
          </button>
          <p>
            {workspace.dirty ? 'Unsaved changes' : 'Saved in this browser'}
            <br />
            Export a backup to keep.
          </p>
        </div>
      </aside>
      <div className="main-shell">
        <header className="project-header">
          <div>
            <span className="project-kind">
              {file.sampleProject ? 'Sample project' : 'Local project'} ·
              Revision {project.revision}
            </span>
            <h1>{project.name}</h1>
          </div>
          <div className="header-actions">
            <button className="primary" onClick={workspace.save}>
              Save project
            </button>
            <button className="export-button" onClick={exportNotes}>
              Export <span aria-hidden="true">↓</span>
            </button>
          </div>
        </header>
        <main id="workspace" tabIndex={-1}>
          {isBuild && (
            <nav className="build-tabs" aria-label="Build sections">
              {[
                ['parts', 'Parts & budget'],
                ['firmware', 'Firmware'],
                ['experiments', 'Test plan'],
              ].map(([id, label]) => (
                <button
                  key={id}
                  aria-current={page === id ? 'page' : undefined}
                  onClick={() => navigate(id)}
                >
                  {label}
                </button>
              ))}
            </nav>
          )}
          <FeatureBoundary key={page + file.id}>
            {page === 'projects' && (
              <Projects saved={workspace.saved} onOpen={openProject} />
            )}
            {page === 'bench' && (
              <Bench
                project={project}
                navigate={navigate}
                briefReviewed={briefReviewed}
                sampleProject={file.sampleProject}
                hasEstimate={
                  result !== null && result.projectRevision === project.revision
                }
              />
            )}
            {page === 'brief' && (
              <Brief
                project={project}
                onSave={workspace.updateProject}
                onDirty={workspace.setDraftDirty}
              />
            )}
            {page === 'evidence' && (
              <Evidence
                project={project}
                result={result}
                onResult={workspace.addEstimate}
                onDirty={workspace.setDraftDirty}
                history={file.estimates}
              />
            )}
            {page === 'parts' && (
              <Parts
                project={project}
                parts={parts}
                onChange={workspace.updateParts}
                onDirty={workspace.setDraftDirty}
              />
            )}
            {page === 'firmware' && <Firmware />}
            {page === 'tools' && <Tools />}
            {page === 'experiments' && <Experiments />}
          </FeatureBoundary>
          {workspace.error && (
            <p className="error-message" role="alert">
              {workspace.error}
              <button
                onClick={() => workspace.setError('')}
                aria-label="Dismiss error"
              >
                ×
              </button>
            </p>
          )}
          {notice && (
            <p className="export-status" role="status">
              {notice}
            </p>
          )}
          <details className="prototype-details">
            <summary>About this prototype & your data</summary>
            <p>
              Save project keeps applied changes in this browser. Export creates
              a portable versioned JSON file; import validates it and opens a
              new copy. Browser storage is not encrypted or a backup. Do not
              enter secrets. Part prices and the assembly are illustrative.
              External tools, device access, and cloud AI are not connected. No
              project data is uploaded.
            </p>
          </details>
        </main>
      </div>
    </div>
  );
}

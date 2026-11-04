import { Component, type ReactNode } from 'react';
export function Label({ children }: { children: ReactNode }) {
  return <span className="eyebrow">{children}</span>;
}
export function SectionHead({
  number,
  title,
  detail,
}: {
  number: string;
  title: string;
  detail: string;
}) {
  return (
    <header className="section-head">
      <Label>STEP {number}</Label>
      <h2>{title}</h2>
      <p>{detail}</p>
    </header>
  );
}
export class FeatureBoundary extends Component<
  { children: ReactNode },
  { failed: boolean }
> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    return this.state.failed ? (
      <section className="notice" role="alert">
        <h2>This workspace panel could not render.</h2>
        <p>
          Your other panels remain available. No device operation was started.
        </p>
        <button onClick={() => this.setState({ failed: false })}>
          Retry panel
        </button>
      </section>
    ) : (
      this.props.children
    );
  }
}

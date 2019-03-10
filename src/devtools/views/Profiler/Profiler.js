// @flow

import React, { useContext, useState } from 'react';
import { ProfilerContext, ProfilerContextController } from './ProfilerContext';
import Button from '../Button';
import ButtonIcon from '../ButtonIcon';
import TabBar from '../TabBar';
import RecordToggle from './RecordToggle';

import styles from './Profiler.css';

export type Props = {||};

export default function ProfilerOuter(_: Props) {
  return (
    <ProfilerContextController>
      <ProfilerInner />
    </ProfilerContextController>
  );
}

function ProfilerInner(_: Props) {
  const { hasProfilingData, isProfiling } = useContext(ProfilerContext);
  const [tab, setTab] = useState('flame-chart');

  let view = null;
  if (isProfiling) {
    view = <RecortdingInProgress />;
  } else if (!hasProfilingData) {
    view = <NoProfilingData />;
  } else {
    // TODO (profiling) Differentiate between no data and no data for the current root
    // TODO (profiling) Show selected "tab" view
    view = <div>Coming soon...</div>;
  }

  return (
    <div className={styles.Profiler}>
      <div className={styles.Toolbar}>
        <RecordToggle />
        <Button disabled title="Reload and start profiling">
          {/* TODO (profiling) Wire up reload button */}
          <ButtonIcon type="reload" />
        </Button>
        <div className={styles.VRule} />
        <TabBar
          currentTab={tab}
          disabled={isProfiling || !hasProfilingData}
          id="Profiler"
          selectTab={setTab}
          size="small"
          tabs={tabs}
        />
        <div className={styles.Spacer} />
        <Button disabled title="Filter commits by duration">
          {/* TODO (profiling) Wire up filter button */}
          <ButtonIcon type="filter" />
        </Button>
      </div>
      <div className={styles.Content}>{view}</div>
    </div>
  );
}

const tabs = [
  { id: 'flame-chart', icon: 'flame-chart', label: 'Flamegraph' },
  { id: 'ranked-chart', icon: 'ranked-chart', label: 'Ranked' },
  { id: 'interactions', icon: 'interactions', label: 'Interactions' },
];

const NoProfilingData = () => (
  <div className={styles.Column}>
    <div className={styles.Header}>No profiling data has been recorded.</div>
    <div className={styles.Row}>
      Click the record button <RecordToggle /> to start recording.
    </div>
  </div>
);

const RecortdingInProgress = () => {
  return (
    <div className={styles.Column}>
      <div className={styles.Header}>Profiling is in progress...</div>
      <div className={styles.Row}>
        Click the record button <RecordToggle /> to stop recording.
      </div>
    </div>
  );
};
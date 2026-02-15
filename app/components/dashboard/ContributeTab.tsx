'use client';

import { useState, useRef, useEffect } from 'react';
import { Badge } from '@/app/components/ui/Badge';
import { Button } from '@/app/components/ui/Button';
import { Card } from '@/app/components/ui/Card';
import { Input } from '@/app/components/ui/Input';
import { Textarea } from '@/app/components/ui/Textarea';
import { Label } from '@/app/components/ui/Label';
import { Pill } from '@/app/components/ui/Pill';
import { cn, formatBytes } from '@/lib/utils';
import { LANGUAGES } from '@/constants/languages';
import { DATA_TYPES } from '@/constants/dataTypes';
import { VOICE_PROMPTS, TEXT_PROMPTS } from '@/constants/prompts';
import { MicrophoneIcon, StopIcon, CheckIcon, DocumentIcon, SignalIcon } from '@heroicons/react/24/outline';
import type { User, Contribution } from '@/types';

interface ContributeTabProps {
  user: User;
  setContribs: React.Dispatch<React.SetStateAction<Contribution[]>>;
}

export function ContributeTab({ user, setContribs }: ContributeTabProps) {
  const avail = user?.dataTypes || ['voice'];
  const [active, setActive] = useState(avail[0] || 'voice');

  const colorMap: Record<string, 'success' | 'info' | 'warning' | 'accent'> = {
    voice: 'success',
    text: 'info',
    documents: 'warning',
    sensor: 'accent'
  };

  return (
    <div>
      <div className="flex gap-1.5 mb-4 flex-wrap">
        {avail.map((id) => {
          const dt = DATA_TYPES.find((d) => d.id === id);
          const Icon = dt?.icon;
          return (
            <Pill key={id} active={active === id} onClick={() => setActive(id)} color={colorMap[id] || 'success'}>
              {Icon && <Icon className="w-4 h-4" />} {dt?.label}
            </Pill>
          );
        })}
      </div>
      {active === 'voice' && <VoiceRecorder user={user} setContribs={setContribs} />}
      {active === 'text' && <TextContributor setContribs={setContribs} />}
      {active === 'documents' && (
        <FileUploader type="documents" label="Documents" accept=".pdf,.jpg,.jpeg,.png,.tif" setContribs={setContribs} />
      )}
      {active === 'sensor' && (
        <FileUploader type="sensor" label="Sensor data" accept=".csv,.json,.gpx,.txt" setContribs={setContribs} />
      )}
    </div>
  );
}

function VoiceRecorder({ user, setContribs }: { user: User; setContribs: React.Dispatch<React.SetStateAction<Contribution[]>> }) {
  const [lang, setLang] = useState(user?.languages?.[0] || 'odia');
  const [idx, setIdx] = useState(0);
  const [rec, setRec] = useState(false);
  const [time, setTime] = useState(0);
  const [done, setDone] = useState(false);
  const timer = useRef<NodeJS.Timeout | null>(null);
  const prompts = VOICE_PROMPTS[lang] || [];
  const prompt = prompts[idx];

  const start = () => {
    setRec(true);
    setTime(0);
    setDone(false);
    timer.current = setInterval(() => setTime((t) => +(t + 0.1).toFixed(1)), 100);
  };

  const stop = () => {
    setRec(false);
    if (timer.current) clearInterval(timer.current);
    setDone(true);
  };

  const submit = () => {
    setContribs((p) => [
      {
        id: Date.now(),
        type: 'voice',
        title: prompt.text,
        lang,
        size: `${time.toFixed(1)}s`,
        status: 'pending',
        date: new Date().toISOString().split('T')[0],
        earnings: 0
      },
      ...p
    ]);
    setDone(false);
    setTime(0);
    setIdx((i) => (i + 1) % prompts.length);
  };

  useEffect(() => () => {
    if (timer.current) clearInterval(timer.current);
  }, []);

  return (
    <div>
      <div className="flex gap-1.5 mb-4">
        {user?.languages?.map((l) => {
          const info = LANGUAGES.find((x) => x.id === l);
          const s = lang === l;
          return (
            <Pill
              key={l}
              active={s}
              onClick={() => {
                setLang(l);
                setIdx(0);
                setDone(false);
                setRec(false);
                if (timer.current) clearInterval(timer.current);
              }}
              color="success"
            >
              <span className="px-1 bg-success-border rounded text-[9px] font-mono">{info?.code}</span> {info?.label?.split(' ')[1]}
            </Pill>
          );
        })}
      </div>
      {prompt && (
        <Card className="mb-4">
          <div className="text-[9px] font-mono text-text-dim tracking-widest mb-2">
            READ ALOUD
          </div>
          <div className="text-base leading-relaxed text-text font-semibold">{prompt.text}</div>
          <div className="text-sm text-text-dim mt-2 italic">
            {prompt.translation}
          </div>
          <div className="text-[9px] text-text-dim mt-2 font-mono">
            {idx + 1} / {prompts.length}
          </div>
        </Card>
      )}
      <div className="flex flex-col items-center py-2 pb-3">
        {rec && (
          <div className="animate-pulse-ring text-3xl font-bold text-danger mb-4 font-mono">
            {time.toFixed(1)}s
          </div>
        )}
        {!done ? (
          <button
            onMouseDown={start}
            onMouseUp={stop}
            onTouchStart={start}
            onTouchEnd={stop}
            className={cn(
              "w-16 h-16 rounded-full flex items-center justify-center text-2xl transition-all border-2 cursor-pointer",
              rec ? "bg-danger-dim border-danger" : "bg-success-dim border-success"
            )}
          >
            {rec ? <StopIcon className="w-8 h-8 text-danger" /> : <MicrophoneIcon className="w-8 h-8 text-success" />}
          </button>
        ) : (
          <div className="flex gap-2">
            <Button
              variant="ghost"
              onClick={() => {
                setDone(false);
                setTime(0);
              }}
            >
              Redo
            </Button>
            <Button onClick={submit}>
              <CheckIcon className="w-5 h-5 inline" /> Submit {time.toFixed(1)}s
            </Button>
          </div>
        )}
        <div className="text-[9px] text-text-dim mt-2 font-mono tracking-wide">
          {rec ? 'RELEASE TO STOP' : done ? 'SUBMIT OR RE-RECORD' : 'HOLD TO RECORD'}
        </div>
      </div>
    </div>
  );
}

function TextContributor({ setContribs }: { setContribs: React.Dispatch<React.SetStateAction<Contribution[]>> }) {
  const [idx, setIdx] = useState(0);
  const [ans, setAns] = useState('');
  const [ok, setOk] = useState(false);
  const prompt = TEXT_PROMPTS[idx];

  const submit = () => {
    if (!ans.trim()) return;
    setContribs((p) => [
      {
        id: Date.now(),
        type: 'text',
        title: `${prompt.cat} — response`,
        lang: '–',
        size: `~${Math.round(ans.split(' ').length * 1.3)} tok`,
        status: 'pending',
        date: new Date().toISOString().split('T')[0],
        earnings: 0
      },
      ...p
    ]);
    setAns('');
    setOk(true);
    setTimeout(() => {
      setOk(false);
      setIdx((i) => (i + 1) % TEXT_PROMPTS.length);
    }, 1100);
  };

  return (
    <div>
      <Card className="mb-3">
        <Badge color="info" className="mb-2">
          {prompt.cat}
        </Badge>
        <div className="text-sm text-text-dim font-mono mb-2">
          {prompt.inst}
        </div>
        <div className="text-sm text-text leading-relaxed font-semibold">{prompt.q}</div>
        <div className="text-[9px] text-text-dim mt-2 font-mono">
          {idx + 1} / {TEXT_PROMPTS.length}
        </div>
      </Card>
      <Label>Your response</Label>
      <Textarea value={ans} onChange={(e) => setAns(e.target.value)} placeholder="Write a clear, complete answer…" rows={5} />
      <div className="text-sm text-text-dim font-mono mt-1 mb-3">
        {ans.split(/\s+/).filter(Boolean).length} words
      </div>
      <div className="flex gap-2">
        <Button variant="ghost" onClick={() => setIdx((i) => (i + 1) % TEXT_PROMPTS.length)}>
          Skip →
        </Button>
        <Button onClick={submit} disabled={!ans.trim()}>
          {ok ? <><CheckIcon className="w-5 h-5 inline" /> Submitted!</> : 'Submit response'}
        </Button>
      </div>
    </div>
  );
}

interface FileInfo {
  name: string;
  size: number;
}

function FileUploader({
  type,
  label,
  accept,
  setContribs
}: {
  type: string;
  label: string;
  accept: string;
  setContribs: React.Dispatch<React.SetStateAction<Contribution[]>>;
}) {
  const [files, setFiles] = useState<FileInfo[]>([]);
  const [drag, setDrag] = useState(false);
  const [tag, setTag] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFiles = (fl: FileList) =>
    setFiles((p) => [...p, ...Array.from(fl).map((f) => ({ name: f.name, size: f.size }))]);

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDrag(false);
    handleFiles(e.dataTransfer.files);
  };

  const submit = () => {
    if (!files.length) return;
    files.forEach((f) =>
      setContribs((p) => [
        {
          id: Date.now() + Math.random(),
          type,
          title: f.name + (tag ? ` [${tag}]` : ''),
          lang: '–',
          size: formatBytes(f.size),
          status: 'pending',
          date: new Date().toISOString().split('T')[0],
          earnings: 0
        },
        ...p
      ])
    );
    setFiles([]);
    setTag('');
  };

  const Icon = type === 'documents' ? DocumentIcon : SignalIcon;

  return (
    <div>
      <div
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => {
          e.preventDefault();
          setDrag(true);
        }}
        onDragLeave={() => setDrag(false)}
        onDrop={onDrop}
        className={cn(
          "py-8 px-5 text-center mb-3 border-2 border-dashed rounded-lg cursor-pointer transition-colors",
          drag ? "border-success bg-success-dim" : "border-border bg-surface hover:border-success"
        )}
      >
        <Icon className="w-8 h-8 mx-auto mb-2 text-text-mid" />
        <div className="text-sm text-text font-semibold">Drop {label} here or click to browse</div>
        <div className="text-sm text-text-dim mt-1">Accepts: {accept}</div>
        <input
          ref={inputRef}
          type="file"
          multiple
          accept={accept}
          className="hidden"
          onChange={(e) => e.target.files && handleFiles(e.target.files)}
        />
      </div>
      {files.map((f, i) => (
        <div
          key={i}
          className="flex items-center gap-2 px-3 py-2 bg-surface border border-border rounded-lg mb-1"
        >
          <Icon className="w-5 h-5 text-text-mid flex-shrink-0" />
          <div className="flex-1 text-xs text-text overflow-hidden text-ellipsis whitespace-nowrap">
            {f.name}
          </div>
          <span className="text-sm text-text-dim font-mono">{formatBytes(f.size)}</span>
          <button
            onClick={() => setFiles((p) => p.filter((_, j) => j !== i))}
            className="bg-transparent border-none text-text-dim cursor-pointer text-base px-1 leading-none hover:text-danger"
          >
            ×
          </button>
        </div>
      ))}
      <Label className="mt-3">Dataset / tag (optional)</Label>
      <Input
        value={tag}
        onChange={(e) => setTag(e.target.value)}
        placeholder={`e.g. "NCERT Class 10 Maths" or "Ration cards Bhadrak"`}
        className="mb-3"
      />
      <Button onClick={submit} disabled={!files.length}>
        Submit {files.length > 0 ? `${files.length} file${files.length > 1 ? 's' : ''}` : ''} ↑
      </Button>
    </div>
  );
}

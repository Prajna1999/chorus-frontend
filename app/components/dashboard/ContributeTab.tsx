'use client';

import { useState, useRef, useEffect } from 'react';
import { T, SANS, MONO, RADIUS } from '@/lib/theme';
import { LANGUAGES } from '@/constants/languages';
import { DATA_TYPES } from '@/constants/dataTypes';
import { VOICE_PROMPTS, TEXT_PROMPTS } from '@/constants/prompts';
import { MicrophoneIcon, StopIcon, CheckIcon, DocumentIcon, SignalIcon } from '@heroicons/react/24/outline';
import type { User, Contribution } from '@/types';
import { formatBytes } from '@/lib/utils';

interface ContributeTabProps {
  user: User;
  setContribs: React.Dispatch<React.SetStateAction<Contribution[]>>;
}

export function ContributeTab({ user, setContribs }: ContributeTabProps) {
  const avail = user?.dataTypes || ['voice'];
  const [active, setActive] = useState(avail[0] || 'voice');

  const colorMap: Record<string, { c: string; d: string }> = {
    voice: { c: T.green, d: T.greenLight },
    text: { c: T.primary, d: T.primaryLight },
    documents: { c: T.amber, d: T.amberLight },
    sensor: { c: T.primary, d: T.primaryLight }
  };

  return (
    <div>
      {/* Data Type Selector */}
      <div style={{ marginBottom: 24 }}>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {avail.map((id) => {
            const dt = DATA_TYPES.find((d) => d.id === id);
            const Icon = dt?.icon;
            const colors = colorMap[id];
            const isActive = active === id;
            return (
              <button
                key={id}
                onClick={() => setActive(id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  padding: '10px 20px',
                  background: isActive ? colors.d : T.card,
                  border: `1px solid ${T.border}`,
                  borderRadius: RADIUS.md,
                  color: isActive ? colors.c : T.textMid,
                  cursor: 'pointer',
                  fontSize: 14,
                  fontWeight: isActive ? 600 : 500,
                  fontFamily: SANS,
                }}
              >
                {Icon && <Icon className="w-5 h-5" />}
                {dt?.label}
              </button>
            );
          })}
        </div>
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
      {/* Language selector */}
      <div style={{ marginBottom: 20 }}>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {user?.languages?.map((l) => {
            const info = LANGUAGES.find((x) => x.id === l);
            const s = lang === l;
            return (
              <button
                key={l}
                onClick={() => {
                  setLang(l);
                  setIdx(0);
                  setDone(false);
                  setRec(false);
                  if (timer.current) clearInterval(timer.current);
                }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  padding: '8px 16px',
                  background: s ? T.greenLight : T.card,
                  border: `1px solid ${T.border}`,
                  borderRadius: RADIUS.md,
                  color: s ? T.green : T.textMid,
                  cursor: 'pointer',
                  fontSize: 13,
                  fontWeight: s ? 600 : 500,
                  fontFamily: SANS,
                }}
              >
                <span style={{
                  padding: '2px 6px',
                  background: s ? T.green : T.muted,
                  borderRadius: RADIUS.sm,
                  fontSize: 10,
                  fontFamily: MONO,
                  color: s ? '#ffffff' : T.textDim,
                }}>
                  {info?.code}
                </span>
                {info?.label?.split(' ')[1]}
              </button>
            );
          })}
        </div>
      </div>

      {/* Prompt card */}
      {prompt && (
        <div style={{
          background: T.card,
          border: `1px solid ${T.border}`,
          borderRadius: RADIUS.lg,
          padding: 24,
          marginBottom: 24,
        }}>
          <div style={{
            fontFamily: MONO,
            fontSize: 10,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: T.green,
            marginBottom: 12,
          }}>
            Read Aloud
          </div>
          <div style={{
            fontFamily: SANS,
            fontSize: 20,
            lineHeight: 1.5,
            color: T.text,
            fontWeight: 600,
            marginBottom: 8,
          }}>
            {prompt.text}
          </div>
          <div style={{ fontSize: 13, color: T.textDim, fontStyle: 'italic', marginBottom: 12 }}>
            {prompt.translation}
          </div>
          <div style={{ fontSize: 11, color: T.textDim, fontFamily: MONO }}>
            Prompt {idx + 1} of {prompts.length}
          </div>
        </div>
      )}

      {/* Recorder */}
      <div style={{
        background: T.card,
        border: `1px solid ${T.border}`,
        borderRadius: RADIUS.lg,
        padding: 40,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 20,
      }}>
        {rec && (
          <div style={{
            fontFamily: MONO,
            fontSize: 36,
            fontWeight: 700,
            color: T.green,
            textAlign: 'center',
          }}>
            {time.toFixed(1)}s
          </div>
        )}

        {!done ? (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
            <button
              onMouseDown={start}
              onMouseUp={stop}
              onTouchStart={start}
              onTouchEnd={stop}
              style={{
                width: 100,
                height: 100,
                borderRadius: '50%',
                background: rec ? T.red : T.green,
                border: 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
              }}
            >
              {rec ? (
                <StopIcon className="w-10 h-10 text-white" />
              ) : (
                <MicrophoneIcon className="w-10 h-10 text-white" />
              )}
            </button>
            <div style={{
              fontFamily: MONO,
              fontSize: 11,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: rec ? T.green : T.textDim,
            }}>
              {rec ? 'Release to Stop' : 'Hold to Record'}
            </div>
          </div>
        ) : (
          <div style={{ display: 'flex', gap: 12 }}>
            <button
              onClick={() => {
                setDone(false);
                setTime(0);
              }}
              style={{
                padding: '10px 20px',
                background: 'transparent',
                border: `1px solid ${T.border}`,
                borderRadius: RADIUS.md,
                color: T.textMid,
                cursor: 'pointer',
                fontSize: 14,
                fontFamily: SANS,
              }}
            >
              Redo
            </button>
            <button
              onClick={submit}
              style={{
                padding: '10px 20px',
                background: T.green,
                border: 'none',
                borderRadius: RADIUS.md,
                color: '#ffffff',
                cursor: 'pointer',
                fontSize: 14,
                fontWeight: 600,
                fontFamily: SANS,
                display: 'flex',
                alignItems: 'center',
                gap: 6,
              }}
            >
              <CheckIcon className="w-5 h-5" />
              Submit {time.toFixed(1)}s
            </button>
          </div>
        )}
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
      <div style={{
        background: T.card,
        border: `1px solid ${T.border}`,
        borderRadius: RADIUS.lg,
        padding: 24,
        marginBottom: 20,
      }}>
        <div style={{
          display: 'inline-block',
          padding: '4px 10px',
          background: T.primaryLight,
          border: `1px solid ${T.border}`,
          borderRadius: RADIUS.sm,
          fontFamily: MONO,
          fontSize: 10,
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          color: T.primary,
          marginBottom: 12,
        }}>
          {prompt.cat}
        </div>
        <div style={{ fontSize: 12, color: T.textDim, fontFamily: MONO, marginBottom: 10 }}>
          {prompt.inst}
        </div>
        <div style={{
          fontFamily: SANS,
          fontSize: 18,
          lineHeight: 1.5,
          color: T.text,
          fontWeight: 600,
        }}>
          {prompt.q}
        </div>
        <div style={{ fontSize: 11, color: T.textDim, fontFamily: MONO, marginTop: 10 }}>
          Question {idx + 1} of {TEXT_PROMPTS.length}
        </div>
      </div>

      <div style={{ marginBottom: 16 }}>
        <label style={{
          display: 'block',
          fontSize: 13,
          fontWeight: 600,
          color: T.textMid,
          marginBottom: 8,
        }}>
          Your Response
        </label>
        <textarea
          value={ans}
          onChange={(e) => setAns(e.target.value)}
          placeholder="Write a clear, complete answer…"
          rows={7}
          style={{
            width: '100%',
            padding: 14,
            background: T.bg,
            border: `1px solid ${T.border}`,
            borderRadius: RADIUS.md,
            color: T.text,
            fontFamily: SANS,
            fontSize: 14,
            lineHeight: 1.6,
            outline: 'none',
            resize: 'vertical',
          }}
        />
        <div style={{ fontSize: 12, color: T.textDim, fontFamily: MONO, marginTop: 6 }}>
          {ans.split(/\s+/).filter(Boolean).length} words
        </div>
      </div>

      <div style={{ display: 'flex', gap: 10 }}>
        <button
          onClick={() => setIdx((i) => (i + 1) % TEXT_PROMPTS.length)}
          style={{
            padding: '10px 20px',
            background: 'transparent',
            border: `1px solid ${T.border}`,
            borderRadius: RADIUS.md,
            color: T.textMid,
            cursor: 'pointer',
            fontSize: 13,
            fontFamily: SANS,
          }}
        >
          Skip →
        </button>
        <button
          onClick={submit}
          disabled={!ans.trim()}
          style={{
            padding: '10px 20px',
            background: ans.trim() ? T.primary : T.muted,
            border: 'none',
            borderRadius: RADIUS.md,
            color: ans.trim() ? '#ffffff' : T.textDim,
            cursor: ans.trim() ? 'pointer' : 'not-allowed',
            fontSize: 13,
            fontWeight: 600,
            fontFamily: SANS,
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            opacity: ans.trim() ? 1 : 0.5,
          }}
        >
          {ok ? (
            <>
              <CheckIcon className="w-4 h-4" />
              Submitted!
            </>
          ) : (
            'Submit Response'
          )}
        </button>
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
  const colors = type === 'documents'
    ? { c: T.amber, d: T.amberLight }
    : { c: T.primary, d: T.primaryLight };

  return (
    <div>
      {/* Drop zone */}
      <div
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => {
          e.preventDefault();
          setDrag(true);
        }}
        onDragLeave={() => setDrag(false)}
        onDrop={onDrop}
        style={{
          padding: '50px 30px',
          textAlign: 'center',
          marginBottom: 20,
          border: `2px dashed ${drag ? colors.c : T.border}`,
          borderRadius: RADIUS.lg,
          background: drag ? colors.d : T.card,
          cursor: 'pointer',
        }}
      >
        <Icon className="w-10 h-10" style={{ margin: '0 auto 12px', color: drag ? colors.c : T.textMid }} />
        <div style={{ fontSize: 15, fontWeight: 600, color: T.text, marginBottom: 6 }}>
          Drop {label} here or click to browse
        </div>
        <div style={{ fontSize: 13, color: T.textDim }}>
          Accepts: {accept}
        </div>
        <input
          ref={inputRef}
          type="file"
          multiple
          accept={accept}
          style={{ display: 'none' }}
          onChange={(e) => e.target.files && handleFiles(e.target.files)}
        />
      </div>

      {/* File list */}
      {files.length > 0 && (
        <div style={{ marginBottom: 20 }}>
          {files.map((f, i) => (
            <div
              key={i}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                padding: '10px 14px',
                background: T.surface,
                border: `1px solid ${T.border}`,
                borderRadius: RADIUS.md,
                marginBottom: 6,
              }}
            >
              <Icon className="w-5 h-5 flex-shrink-0" style={{ color: T.textMid }} />
              <div style={{ flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', fontSize: 13, color: T.text }}>
                {f.name}
              </div>
              <span style={{ fontSize: 12, color: T.textDim, fontFamily: MONO }}>{formatBytes(f.size)}</span>
              <button
                onClick={() => setFiles((p) => p.filter((_, j) => j !== i))}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: T.textDim,
                  cursor: 'pointer',
                  fontSize: 18,
                  padding: '0 6px',
                }}
              >
                ×
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Tag input */}
      <div style={{ marginBottom: 14 }}>
        <label style={{
          display: 'block',
          fontSize: 13,
          fontWeight: 600,
          color: T.textMid,
          marginBottom: 6,
        }}>
          Dataset / Tag (optional)
        </label>
        <input
          value={tag}
          onChange={(e) => setTag(e.target.value)}
          placeholder='e.g. "NCERT Class 10 Maths"'
          style={{
            width: '100%',
            padding: '10px 14px',
            background: T.bg,
            border: `1px solid ${T.border}`,
            borderRadius: RADIUS.md,
            color: T.text,
            fontFamily: SANS,
            fontSize: 13,
            outline: 'none',
          }}
        />
      </div>

      {/* Submit */}
      <button
        onClick={submit}
        disabled={!files.length}
        style={{
          padding: '10px 24px',
          background: files.length ? colors.c : T.muted,
          border: 'none',
          borderRadius: RADIUS.md,
          color: files.length ? '#ffffff' : T.textDim,
          cursor: files.length ? 'pointer' : 'not-allowed',
          fontFamily: SANS,
          fontSize: 14,
          fontWeight: 600,
          opacity: files.length ? 1 : 0.5,
        }}
      >
        Submit {files.length > 0 ? `${files.length} file${files.length > 1 ? 's' : ''}` : ''} ↑
      </button>
    </div>
  );
}

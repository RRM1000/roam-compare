"use client";

import { useId, useMemo, useState, type KeyboardEvent } from "react";
import {
  esimSources,
  getEsimDevice,
  searchEsimDevices,
  type EsimReadiness,
  type LockStatus,
} from "@/lib/esim-devices";
import { formatCheckedDate } from "@/lib/catalog";

type DeviceCompatibilityCheckerProps = {
  selectedDeviceId: string;
  lockStatus: LockStatus;
  readiness: EsimReadiness;
  onDeviceChange: (deviceId: string) => void;
  onLockStatusChange: (status: LockStatus) => void;
};

function deviceName(manufacturer: string, model: string) {
  return `${manufacturer} ${model}`;
}

export default function DeviceCompatibilityChecker({
  selectedDeviceId,
  lockStatus,
  readiness,
  onDeviceChange,
  onLockStatusChange,
}: DeviceCompatibilityCheckerProps) {
  const listboxId = useId();
  const helpId = useId();
  const selectedDevice = getEsimDevice(selectedDeviceId);
  const selectedSource = selectedDevice ? esimSources[selectedDevice.sourceId] : undefined;
  const [query, setQuery] = useState(selectedDevice ? deviceName(selectedDevice.manufacturer, selectedDevice.model) : "");
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const matches = useMemo(() => searchEsimDevices(query), [query]);
  const showMatches = isOpen && query.trim().length > 0;
  const activeOption = showMatches && matches[activeIndex] ? `${listboxId}-option-${activeIndex}` : undefined;

  function chooseDevice(deviceId: string) {
    const device = getEsimDevice(deviceId);
    if (!device) return;
    onDeviceChange(device.id);
    setQuery(deviceName(device.manufacturer, device.model));
    setIsOpen(false);
    setActiveIndex(-1);
  }

  function handleKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setIsOpen(true);
      setActiveIndex((index) => Math.min(index + 1, Math.max(matches.length - 1, 0)));
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setIsOpen(true);
      setActiveIndex((index) => index <= 0 ? Math.max(matches.length - 1, 0) : index - 1);
    } else if (event.key === "Enter" && isOpen && matches[activeIndex]) {
      event.preventDefault();
      chooseDevice(matches[activeIndex].id);
    } else if (event.key === "Escape") {
      setIsOpen(false);
    }
  }

  const resultTitle = !selectedDevice
    ? "Choose your exact model"
    : selectedDevice.support === "unsupported"
      ? "This model does not support eSIM"
      : lockStatus === "locked"
        ? "Your phone must be unlocked"
        : readiness === "ready"
          ? "Listed as eSIM-capable"
          : selectedDevice.support === "variant-dependent"
            ? "Check the exact version"
            : "One more check: network lock";

  const resultCopy = !selectedDevice
    ? "Search the model name shown in your phone settings. We will not guess from the brand alone."
    : selectedDevice.support === "unsupported"
      ? `${selectedDevice.caveat} A travel eSIM will not work on this model.`
      : lockStatus === "locked"
        ? "A travel eSIM from another provider needs the phone to be network-unlocked, whatever the model supports. Ask your UK network about unlocking it."
        : selectedDevice.support === "variant-dependent"
          ? `${selectedDevice.caveat} Look for “Add eSIM” in Settings before buying.`
          : lockStatus === "unlocked"
            ? `${selectedDevice.caveat} The model and lock checks both look good, but confirm the regional version before checkout.`
            : `${selectedDevice.caveat} Ask your UK network whether the phone can use SIMs from another provider.`;

  return (
    <div className="compatibility-panel" id="compatibility-panel">
      <div className="compatibility-heading">
        <strong>Will an eSIM work on your phone?</strong>
        <small>Search the exact model, then check whether it can use SIMs from another network.</small>
      </div>

      <div
        className="device-search field"
        onBlur={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setIsOpen(false);
        }}
      >
        <label className="device-search-label" htmlFor="device-model-search">Search for your phone</label>
        <input
          id="device-model-search"
          type="search"
          autoComplete="off"
          role="combobox"
          aria-autocomplete="list"
          aria-expanded={showMatches}
          aria-controls={listboxId}
          aria-activedescendant={activeOption}
          aria-describedby={helpId}
          value={query}
          placeholder="iPhone 15, Galaxy S24 or Pixel 8"
          onFocus={() => { setIsOpen(true); setActiveIndex(-1); }}
          onClick={() => setIsOpen(true)}
          onKeyDown={handleKeyDown}
          onChange={(event) => {
            setQuery(event.target.value);
            setIsOpen(true);
            setActiveIndex(-1);
            if (selectedDeviceId) onDeviceChange("");
          }}
        />
        <small className="search-help" id={helpId}>Start typing a model, then choose a result.</small>
        <span className="sr-only" aria-live="polite">{showMatches ? `${matches.length} matching phone ${matches.length === 1 ? "model" : "models"}` : ""}</span>
        {showMatches && (
          <ul className="device-results" id={listboxId} role="listbox" aria-label="Matching phone models">
            {matches.length > 0 ? matches.map((device, index) => (
              <li
                className={index === activeIndex ? "is-active" : ""}
                id={`${listboxId}-option-${index}`}
                role="option"
                aria-selected={device.id === selectedDeviceId}
                key={device.id}
                onMouseDown={(event) => event.preventDefault()}
                onMouseEnter={() => setActiveIndex(index)}
                onClick={() => chooseDevice(device.id)}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") chooseDevice(device.id);
                }}
              >
                <span><strong>{device.model}</strong><small>{device.manufacturer}</small></span>
                <em className={device.support}>{device.support === "supported" ? "Listed" : device.support === "unsupported" ? "No eSIM" : "Check version"}</em>
              </li>
            )) : <li className="no-device-result" role="presentation">No confirmed match. Try a shorter model name.</li>}
          </ul>
        )}
      </div>

      <label className="field lock-field">
        <span>Can it use SIMs from another network?</span>
        <select value={lockStatus} onChange={(event) => onLockStatusChange(event.target.value as LockStatus)} aria-label="Phone network lock status">
          <option value="unknown">I’m not sure</option>
          <option value="unlocked">Yes</option>
          <option value="locked">No</option>
        </select>
        <small className="search-help">Your UK network can confirm this.</small>
      </label>

      <div className={`compatibility-result ${readiness}`} role="status" aria-live="polite">
        <strong>{resultTitle}</strong>
        <p>{resultCopy}</p>
        {selectedSource && <p className="device-source">Source: <a href={selectedSource.url} target="_blank" rel="noopener noreferrer">{selectedSource.label}</a> · checked {formatCheckedDate(selectedSource.checkedAt)} · review by {formatCheckedDate(selectedSource.reviewAfter)}</p>}
      </div>

      <details className="compatibility-fallback">
        <summary>Can’t find your phone?</summary>
        <p>Dial <strong>*#06#</strong> and look for an EID, or open your SIM settings and look for “Add eSIM”. An EID is strong evidence the phone has eSIM hardware; you should still confirm it is network-unlocked.</p>
      </details>
    </div>
  );
}

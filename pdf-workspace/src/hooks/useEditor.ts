"use client";

import { useState, useCallback } from "react";
import { EditorState, ToolType } from "@/types";

const DEFAULT_STATE: EditorState = {
  activeTool: "select",
  activePageIndex: 0,
  zoom: 100,
  canUndo: false,
  canRedo: false,
  isLoading: false,
  isSaving: false,
};

export function useEditor() {
  const [state, setState] = useState<EditorState>(DEFAULT_STATE);

  const setActiveTool = useCallback((tool: ToolType) => {
    setState((prev) => ({ ...prev, activeTool: tool }));
  }, []);

  const setActivePageIndex = useCallback((index: number) => {
    setState((prev) => ({ ...prev, activePageIndex: index }));
  }, []);

  const setZoom = useCallback((zoom: number) => {
    const clamped = Math.min(Math.max(zoom, 25), 400);
    setState((prev) => ({ ...prev, zoom: clamped }));
  }, []);

  const zoomIn = useCallback(() => {
    setState((prev) => ({
      ...prev,
      zoom: Math.min(prev.zoom + 25, 400),
    }));
  }, []);

  const zoomOut = useCallback(() => {
    setState((prev) => ({
      ...prev,
      zoom: Math.max(prev.zoom - 25, 25),
    }));
  }, []);

  const resetZoom = useCallback(() => {
    setState((prev) => ({ ...prev, zoom: 100 }));
  }, []);

  const setLoading = useCallback((isLoading: boolean) => {
    setState((prev) => ({ ...prev, isLoading }));
  }, []);

  const setSaving = useCallback((isSaving: boolean) => {
    setState((prev) => ({ ...prev, isSaving }));
  }, []);

  // Placeholder — will wire to Fabric.js history
  const undo = useCallback(() => {
    console.log("Undo — to be implemented with Fabric.js");
  }, []);

  const redo = useCallback(() => {
    console.log("Redo — to be implemented with Fabric.js");
  }, []);

  return {
    state,
    setActiveTool,
    setActivePageIndex,
    setZoom,
    zoomIn,
    zoomOut,
    resetZoom,
    setLoading,
    setSaving,
    undo,
    redo,
  };
}

import { useEffect, useMemo, useState } from 'react';
import { Box, Typography } from '@mui/material';

export type PieSegment = {
  label: string;
  value: number;
  color: string;
};

type PieChartProps = {
  segments: PieSegment[];
  title: string;
  size?: number;
};

const RADIUS = 38;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;
const STROKE_WIDTH = 22;

export const PieChart = ({ segments, title, size = 160 }: PieChartProps) => {
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    const id = requestAnimationFrame(() => setAnimated(true));
    return () => cancelAnimationFrame(id);
  }, []);

  const total = segments.reduce((sum, s) => sum + s.value, 0);

  const slices = useMemo(() => {
    if (total === 0) return [];
    let accumulated = 0;
    return segments
      .filter((s) => s.value > 0)
      .map((s) => {
        const percent = s.value / total;
        const dashLength = percent * CIRCUMFERENCE;
        const offset = accumulated * CIRCUMFERENCE;
        accumulated += percent;
        return { ...s, dashLength, offset };
      });
  }, [segments, total]);

  return (
    <Box>
      <Typography variant="subtitle2" align="center" sx={{ mb: 2, fontWeight: 600 }}>
        {title}
      </Typography>
      {total === 0 ? (
        <Typography variant="body2" color="text.secondary" align="center">
          No data
        </Typography>
      ) : (
        <Box
          display="flex"
          alignItems="center"
          gap={2.5}
          justifyContent="center"
          flexWrap="wrap"
        >
          <svg
            width={size}
            height={size}
            viewBox="0 0 100 100"
            role="img"
            aria-label={`${title} pie chart`}
            style={{ flexShrink: 0 }}
          >
            <g transform="rotate(-90 50 50)">
              {/* Background track */}
              <circle
                cx="50"
                cy="50"
                r={RADIUS}
                fill="none"
                stroke="#f5f5f5"
                strokeWidth={STROKE_WIDTH}
              />
              {slices.map((slice) => (
                <circle
                  key={slice.label}
                  cx="50"
                  cy="50"
                  r={RADIUS}
                  fill="none"
                  stroke={slice.color}
                  strokeWidth={STROKE_WIDTH}
                  style={{
                    strokeDasharray: `${animated ? slice.dashLength : 0} ${CIRCUMFERENCE}`,
                    strokeDashoffset: -slice.offset,
                    transition: 'stroke-dasharray 0.6s ease-out',
                  }}
                />
              ))}
            </g>
          </svg>

          <Box display="flex" flexDirection="column" gap={0.75} minWidth={110}>
            {segments.map((s) => (
              <Box key={s.label} display="flex" alignItems="center" gap={1}>
                <Box
                  sx={{
                    width: 10,
                    height: 10,
                    borderRadius: '50%',
                    backgroundColor: s.color,
                    flexShrink: 0,
                  }}
                />
                <Typography variant="caption" sx={{ flex: 1 }}>
                  {s.label}
                </Typography>
                <Typography variant="caption" fontWeight={600}>
                  {s.value}
                </Typography>
              </Box>
            ))}
          </Box>
        </Box>
      )}
    </Box>
  );
};

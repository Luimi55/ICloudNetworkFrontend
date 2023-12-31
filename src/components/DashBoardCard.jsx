import React from 'react'
import { Avatar, Card, CardContent, Stack, SvgIcon, Typography } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';

const DashBoardCard = (props) => {

    const {icon, title, color, sx, value } = props;

  return (
    <Card sx={sx}>
        <CardContent>
            <Stack
            alignItems="flex-start"
            direction="row"
            justifyContent="space-between"
            spacing={3}
            >
                <Stack spacing={1}>
                    <Typography
                    color="text.secondary"
                    variant="overline"
                    >
                        {title}
                    </Typography>
                    <Typography variant="h4">
                    {value}
                    </Typography>
                </Stack>
                <Avatar
                    sx={{
                    backgroundColor: color,
                    height: 56,
                    width: 56
                    }}
                >
                    {icon}
                </Avatar>
            </Stack>
        </CardContent>
    </Card>
  )
}

export default DashBoardCard
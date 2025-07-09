import {Grid, List, ListItemButton, ListItemText} from "@mui/material";
import type {FC} from "react";
import {memo, useMemo} from "react";
import {useGetSkillsQuery} from "../../state/hooks";

type Lists = {
  left: [number, string][];
  right: [number, string][];
};
type Props = {
  selectedSkills: number[];
  onSelectSkill: (id: number) => void;
  onDeselectSkill: (id: number) => void;
}

const SkillTransferList: FC<Props> = ({selectedSkills, onSelectSkill, onDeselectSkill}) => {
  const {data: allSkills} = useGetSkillsQuery();

  const {left, right} = useMemo<Lists>(() => {
    const lists: Lists = {left: [], right: []};
    for (const skill of (allSkills ?? [])) {
      const {id, name} = skill;
      if (selectedSkills.includes(id)) {
        lists.right.push([id, name]);
      } else {
        lists.left.push([id, name]);
      }
    }

    lists.left.sort(compareSkillTuple);
    lists.right.sort(compareSkillTuple);
    return lists;
  }, [allSkills, selectedSkills]);

  return (
    <Grid container spacing={8}>
      <Grid size={6}>
        <h4>Skills</h4>
        <SkillList list={left} onSelect={onSelectSkill} />
      </Grid>
      <Grid size={6}>
        <h4>Selected Skills</h4>
        <SkillList list={right} onSelect={onDeselectSkill} />
      </Grid>
    </Grid>
  );
}

type ListProps = {
  list: [number, string][];
  onSelect: (val: number) => void;
};
const SkillList: FC<ListProps> = ({list, onSelect}) => (
  <List component="div" role="list">
    {list.map(([id, name]) => (
      <ListItemButton key={id} onClick={() => onSelect(id)} role="listItem">
        <ListItemText>{name}</ListItemText>
      </ListItemButton>
    ))}
  </List>
);

const compareSkillTuple = (a: [number, string], b: [number, string]) =>
  a[1] < b[1] ? -1 : 1;

export default memo(SkillTransferList);
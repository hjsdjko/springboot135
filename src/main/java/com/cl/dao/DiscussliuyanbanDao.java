package com.cl.dao;

import com.cl.entity.DiscussliuyanbanEntity;
import com.baomidou.mybatisplus.mapper.BaseMapper;
import java.util.List;
import java.util.Map;
import com.baomidou.mybatisplus.mapper.Wrapper;
import com.baomidou.mybatisplus.plugins.pagination.Pagination;

import org.apache.ibatis.annotations.Param;
import com.cl.entity.view.DiscussliuyanbanView;


/**
 * 留言板评论表
 * 
 * @author 
 * @email 
 * @date 2024-03-19 21:20:19
 */
public interface DiscussliuyanbanDao extends BaseMapper<DiscussliuyanbanEntity> {
	
	List<DiscussliuyanbanView> selectListView(@Param("ew") Wrapper<DiscussliuyanbanEntity> wrapper);

	List<DiscussliuyanbanView> selectListView(Pagination page,@Param("ew") Wrapper<DiscussliuyanbanEntity> wrapper);
	
	DiscussliuyanbanView selectView(@Param("ew") Wrapper<DiscussliuyanbanEntity> wrapper);
	

}

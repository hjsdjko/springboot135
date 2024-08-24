package com.cl.dao;

import com.cl.entity.NongchanpinEntity;
import com.baomidou.mybatisplus.mapper.BaseMapper;
import java.util.List;
import java.util.Map;
import com.baomidou.mybatisplus.mapper.Wrapper;
import com.baomidou.mybatisplus.plugins.pagination.Pagination;

import org.apache.ibatis.annotations.Param;
import com.cl.entity.view.NongchanpinView;


/**
 * 农产品
 * 
 * @author 
 * @email 
 * @date 2024-03-19 21:20:19
 */
public interface NongchanpinDao extends BaseMapper<NongchanpinEntity> {
	
	List<NongchanpinView> selectListView(@Param("ew") Wrapper<NongchanpinEntity> wrapper);

	List<NongchanpinView> selectListView(Pagination page,@Param("ew") Wrapper<NongchanpinEntity> wrapper);
	
	NongchanpinView selectView(@Param("ew") Wrapper<NongchanpinEntity> wrapper);
	

}
